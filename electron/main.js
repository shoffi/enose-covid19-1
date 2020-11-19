const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const modal = require('electron-modal');
const path = require('path');
const PythonShell = require('python-shell');
const url = require('url');
const mysql = require('mysql');
const fs = require('fs');
const Store = require('./Store.js');
const rpio = require('rpio');

let mainWindow;
let ArduinoPort = ''

// MySQl Connection
let connection = mysql.createConnection({
    host    :   'localhost',
    user    :   'root',
    password:   'adminadmin',
    database:   'enose'
})


// First instantiate the class
const store = new Store({
    // We'll call our data file 'user-preferences'
    configName: 'user-preferences',
    defaults: {
        // 800x600 is the default size of our window
        windowBounds: { width: 800, height: 600 }
    }
});

function createWindow () {
    connection.connect(function (err) {
        console.log(err)
    })

    modal.setup();

    // First we'll get our height and width. This will be the defaults if there wasn't anything saved
    let { width, height } = store.get('windowBounds');

    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '../index.html'),
        protocol: 'file:',
        slashes: true,
    });

    mainWindow = new BrowserWindow({ 
        width: width, 
        height: height ,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        },
    });

    // mainWindow.webContents.openDevTools()

    // The BrowserWindow class extends the node.js core EventEmitter class, so we use that API
    // to listen to events on the BrowserWindow. The resize event is emitted when the window size changes.
    mainWindow.on('resize', () => {
        // The event doesn't pass us the window size, so we call the `getBounds` method which returns an object with
        // the height, width, and x and y coordinates.
        let { width, height } = mainWindow.getBounds();
        // Now that we have them, save them using the `set` method.
        store.set('windowBounds', { width, height });
    });

    mainWindow.loadURL(startUrl);
    
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
    app.quit();
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});


// // // // // // // // // // // // // // // //
// Fungsi Electron! hayooo
// // // // // // // // // // // // // // // //

ipcMain.on('mounted', () => {
    let { rumahSakit } = store.get('ID');
    mainWindow.send('mountedResponse', rumahSakit)
})

ipcMain.on('connect', () => {
    console.log('connecting....')
    // sinkronisasi awal  
});

ipcMain.on('disconnect', () => {
    //message = `Disconnected!`
    //mainWindow.send('disconnectResponse', message)
});

ipcMain.on('storePatient', (event, input, detailPatient) => {

    let pengambilan = {
        rs_id       :   1,
        nurse_id    :   detailPatient.nurse_id,
        room_id     :   detailPatient.ruang_id,
        patient_id  :   detailPatient.patient_id,

        s1  :   input[0][0],
        s2  :   input[1][0],
        s3  :   input[2][0],
        s4  :   input[3][0],
        s5  :   input[4][0],
        s6  :   input[5][0],
        s7  :   input[6][0],
        s8  :   input[7][0],
        s9  :   input[8][0],

        c1  :   input[9][0],
        c2  :   input[10][0],
        c3  :   input[11][0],
        c4  :   input[12][0],
        c5  :   input[13][0],
        c6  :   input[14][0],
        c7  :   input[15][0],
        c8  :   input[16][0],
        c9  :   input[17][0]
    }

    console.log(pengambilan)
    mainWindow.send('storePatientResponse', 1)

    // connection.query('INSERT INTO pengambilan SET ?', pengambilan, function(err, result, fields) {
    //     if (err) throw err;
    //     mainWindow.send('storePatientResponse', result.insertId)
    // });
});

let startResponse

ipcMain.on('start', (event, pengambilan_id, totalTime) => {
    console.log('starting.... ' + pengambilan_id)
    
    let options = {
        scriptPath: path.join(__dirname,"../python/")
    }

    let counter = 1
    let limit = totalTime
    let content = `Timestamp;MQ2_ADC;MQ3_ADC;MQ4_ADC;MQ5_ADC;MQ6_ADC;MQ7_ADC;MQ8_ADC;MQ9_ADC;MQ135_ADC;TEMPERATURE;HUMIDITY;MQ2_PPM_LPG;MQ2_PPM_CO;MQ2_PPM_SMOKE;MQ2_PPM_ALCOHOL;MQ2_PPM_CH4;MQ2_PPM_H2;MQ2_PPM_PROPANE;MQ3_PPM_ALCOHOL;MQ3_PPM_BENZINE;MQ3_PPM_CH4;MQ3_PPM_C0;MQ3_PPM_HEXANE;MQ3_PPM_LPG;MQ4_PPM_ALCOHOL;MQ4_PPM_CH4;MQ4_PPM_CO;MQ4_PPM_H2;MQ4_PPM_LPG;MQ4_PPM_SMOKE;MQ5_PPM_ALCOHOL;MQ5_PPM_CH4;MQ5_PPM_CO;MQ5_PPM_H2;MQ5_PPM_LPG;MQ6_PPM_ALCOHOL;MQ6_PPM_CH4;MQ6_PPM_CO;MQ6_PPM_H2;MQ6_PPM_LPG;MQ7_PPM_ALCOHOL;MQ7_PPM_CH4;MQ7_PPM_CO;MQ7_PPM_H2;MQ7_PPM_LPG;MQ8_PPM_ALCOHOL;MQ8_PPM_CH4;MQ8_PPM_CO;MQ8_PPM_H2;MQ8_PPM_LPG;MQ9_PPM_CH4;MQ9_PPM_CO;MQ9_PPM_LPG;MQ135_PPM_ACETON;MQ135_PPM_ALCOHOL;MQ135_PPM_CO;MQ135_PPM_CO2;MQ135_PPM_NH4;MQ135_PPM_TOLUOL;\n`

    // 11 + 48 = 59
    
    startResponse = setInterval(function () {

        if(counter == limit){
            clearInterval(startResponse)

            let saveOptions = {
                defaultPath: app.getPath('documents') + '/untitled.csv'
            }

            let savePromise = dialog.showSaveDialog(null, saveOptions)
            
            savePromise.then(
                (value) =>{
                    console.log(value)

                    if(!value.canceled) {
                        fs.writeFile(value.filePath, content, (err) => {
                            if(err) {
                                console.log('error in creating file: '+ err.message)
                            }
                            console.log(`file ${value.filePath} successfully created!`)
                        })
                    }
                },
                (error) => {
                    console.log(error)
                }
            )

        }

        PythonShell.PythonShell.run('enose-dummy.py', options, function (err, results) {
            if (err) throw err
            // console.log(`${results}`)
            let data = results[0].split(";")

            let enose = {
                sampling_id: pengambilan_id,
                MQ2_ADC             :   data[0],
                MQ3_ADC             :   data[1],
                MQ4_ADC             :   data[2],
                MQ5_ADC             :   data[3],
                MQ6_ADC             :   data[4],
                MQ7_ADC             :   data[5],
                MQ8_ADC             :   data[6],
                MQ9_ADC             :   data[7],
                MQ135_ADC           :   data[8],
                TEMPERATURE         :   data[9],
                HUMIDITY            :   data[10],

                MQ2_PPM_LPG         :   data[12],
                MQ2_PPM_CO          :   data[13],
                MQ2_PPM_SMOKE       :   data[14],
                MQ2_PPM_ALCOHOL     :   data[15],
                MQ2_PPM_CH4         :   data[16],
                MQ2_PPM_H2          :   data[17],
                MQ2_PPM_PROPANE     :   data[18],

                MQ3_PPM_ALCOHOL     :   data[19],
                MQ3_PPM_BENZINE     :   data[20],
                MQ3_PPM_CH4         :   data[21],
                MQ3_PPM_C11         :   data[22],
                MQ3_PPM_HEXANE      :   data[23],
                MQ3_PPM_LPG         :   data[24],

                MQ4_PPM_ALCOHOL     :   data[25],
                MQ4_PPM_CH4         :   data[26],
                MQ4_PPM_CO          :   data[27],
                MQ4_PPM_H2          :   data[28],
                MQ4_PPM_LPG         :   data[29],
                MQ4_PPM_SMOKE       :   data[30],

                MQ5_PPM_ALCOHOL     :   data[31],
                MQ5_PPM_CH4         :   data[32],
                MQ5_PPM_CO          :   data[33],
                MQ5_PPM_H2          :   data[34],
                MQ5_PPM_LPG         :   data[35],

                MQ6_PPM_ALCOHOL     :   data[36],
                MQ6_PPM_CH4         :   data[37],
                MQ6_PPM_CO          :   data[38],
                MQ6_PPM_H2          :   data[39],
                MQ6_PPM_LPG         :   data[40],

                MQ7_PPM_ALCOHOL     :   data[41],
                MQ7_PPM_CH4         :   data[42],
                MQ7_PPM_CO          :   data[43],
                MQ7_PPM_H2          :   data[44],
                MQ7_PPM_LPG         :   data[45],

                MQ8_PPM_ALCOHOL     :   data[46],
                MQ8_PPM_CH4         :   data[47],
                MQ8_PPM_CO          :   data[48],
                MQ8_PPM_H2          :   data[49],
                MQ8_PPM_LPG         :   data[50],

                MQ9_PPM_CH4         :   data[51],
                MQ9_PPM_CO          :   data[52],
                MQ9_PPM_LPG         :   data[53],

                MQ135_PPM_ACETON    :   data[54],
                MQ135_PPM_ALCOHOL   :   data[55],
                MQ135_PPM_CO        :   data[56],
                MQ135_PPM_CO2       :   data[57],
                MQ135_PPM_NH4       :   data[58],
                MQ135_PPM_TOLUOL    :   data[59],

            }

            arrbulan = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
            date = new Date();
            millisecond = date.getMilliseconds();
            detik = date.getSeconds();
            menit = date.getMinutes();
            jam = date.getHours();
            hari = date.getDay();
            tanggal = date.getDate();
            bulan = date.getMonth();
            tahun = date.getFullYear();
            date = tanggal+"-"+arrbulan[bulan]+"-"+tahun+" "+jam+":"+menit+":"+detik+"."+millisecond

            // console.log(enose)
            content = content + `${date};${data[0]};${data[1]};${data[2]};${data[3]};${data[4]};${data[5]};${data[6]};${data[7]};${data[8]};${data[9]};${data[10]};${data[11]};${data[12]};${data[13]};${data[14]};${data[15]};${data[16]};${data[17]};${data[18]};${data[19]};${data[20]};${data[21]};${data[22]};${data[23]};${data[24]};${data[25]};${data[26]};${data[27]};${data[28]};${data[29]};${data[30]};${data[31]};${data[32]};${data[33]};${data[34]};${data[35]};${data[36]};${data[37]};${data[38]};${data[39]};${data[40]};${data[41]};${data[42]};${data[43]};${data[44]};${data[45]};${data[46]};${data[47]};${data[48]};${data[49]};${data[50]};${data[51]};${data[52]};${data[53]};${data[54]};${data[55]};${data[56]};${data[57]};${data[58]};${data[59]};\n`
            console.log(content)

            // connection.query('INSERT INTO enose SET ?', enose, function(err, result, fields) {
            //     if (err) throw err;
            // });

            counter++
            mainWindow.send('startResponse', results[0])
        })

    }, 1000)
});

ipcMain.on('stop', () => {
    console.log("HAPUSSS")
    startResponse = clearInterval(startResponse)
})

ipcMain.on('pompaOn', () => {
    rpio.open(11, rpio.OUTPUT, rpio.LOW);
    rpio.write(11, rpio.HIGH);
})

ipcMain.on('pompaOff', () => {
    rpio.open(11, rpio.OUTPUT, rpio.LOW);
    rpio.write(11, rpio.LOW);
})

ipcMain.on('getPengaturan', () => {
    let { proses1, proses2, proses3 } = store.get('config');
    let result = [proses1, proses2, proses3]
    mainWindow.send('getPengaturanResponse', result)
})

ipcMain.on('updatePengaturan', (event, input) => {
    let { proses1, proses2, proses3 } = input;
    store.set('config', { proses1, proses2, proses3 });
})
