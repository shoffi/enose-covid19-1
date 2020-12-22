import React, { Component, createRef } from "react";
import { Redirect } from 'react-router-dom';
import Stopwatch from "../Clock/Stopwatch";
import TitleBar from '../Nav/TitleBar';
const { ipcRenderer } = window;

class MainChart extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            redirect: null,
            completed: 0,
            text: '',
            proses1 : this.props.proses1 * 1 * 1,
            proses2 : this.props.proses2 * 1 * 1,
            proses3 : this.props.proses3 * 1 * 1,

            isModalOpen: false,
            isStopModalOpen: false
        }

        this.chartRef = createRef();
        this.setProgress = this.setProgress.bind(this);
        this.stopChart = this.stopChart.bind(this);
        this.openModal = this.openModal.bind(this);
        this.stopModal = this.stopModal.bind(this);
    }

    openModal() {
        // e.preventDefault();
        this.setState(state => ({
            isModalOpen: !state.isModalOpen
        }));
    };

    setProgress (completed) {
        this.setState({
            completed: completed
        })
    }

    stopChart () {
        ipcRenderer.send('stop')
        this.setState({redirect: '/ambil-sample'})
    }

    stopModal () {
        this.setState({isStopModalOpen: true})
    }

    componentDidMount() {
        let arrayAll = []
        let diseases = Object.values(this.props.location.state.diseases)
        let resultDisease = Object.keys(diseases).map( (key) => [diseases[key].isChecked ] )
        let comorbidities = Object.values(this.props.location.state.comorbidities)
        let resultComorbidities = Object.keys(comorbidities).map( (key) => [comorbidities[key].isChecked ] )
        arrayAll = resultDisease.concat(resultComorbidities)

        // console.log(this.state)

        let detailPatient = {
            'nurse_id': this.props.location.state.nurse_id,
            'patient_id': this.props.location.state.patient_id,
            'ruang_id': this.props.location.state.ruang_id,
            'covid_status': this.props.location.state.covidStatus,
            'pcr_tool': this.props.location.state.pcr_tool,
            'ct_pcr': this.props.location.state.ct_pcr,
        }

        // pcr_tool & ct_pcr

        let clinical_data = {
            'temperature': this.props.location.state.suhuTubuh,
            'uric_acid': this.props.location.state.asamUrat,
            'cholestrol': this.props.location.state.kolestrol,
            'oxygen_saturation': this.props.location.state.saturasiOksigen,
            'glucose': this.props.location.state.gulaDarah,
            'heart_rate': this.props.location.state.denyutJantung,

            'tekanan_darah': this.props.tekananDarah,
            'respiration_rate': this.props.respirationRate,
            'spo': this.props.spo,

            'ddimer' : this.props.ddimer,
            'hemoglobin' : this.props.hemoglobin,
            'leukosit' : this.props.leukosit,
            'trombosit' : this.props.trombosit,
            'led' : this.props.LED,
            'bloodGas': this.props.bloodGas
        }

        console.log(detailPatient)

        ipcRenderer.send('storePatient', arrayAll, detailPatient, clinical_data)

        let opts = {
            width: 850,
            height: 300,
            series: [
                {},
                {
                    // initial toggled state (optional)
                    show: true,
                    spanGaps: false,
                    // in-legend display
                    label: "S1",
                    // value: (self, rawValue) => "$" + rawValue.toFixed(2),
                    // series style
                    stroke: "red",
                    width: 1,
                    auto: true,
                },
                {
                    show: true,
                    spanGaps: false,
                    label: "S2",
                    stroke: "blue",
                    width: 1,
                    auto: true,
                },
                {
                    show: true,
                    spanGaps: false,
                    label: "S3",
                    stroke: "green",
                    width: 1,
                    auto: true,
                },
                {
                    show: true,
                    spanGaps: false,
                    label: "S4",
                    stroke: "orange",
                    width: 1,
                    auto: true,
                },
                {
                    show: true,
                    spanGaps: false,
                    label: "S5",
                    stroke: "purple",
                    width: 1,
                    auto: true,
                },
                {
                    show: true,
                    spanGaps: false,
                    label: "S6",
                    stroke: "pink",
                    width: 1,
                    auto: true,
                },
                {
                    show: true,
                    spanGaps: false,
                    label: "S7",
                    stroke: "violet",
                    width: 1,
                    auto: true,
                },
                {
                    show: true,
                    spanGaps: false,
                    label: "S8",
                    stroke: "black",
                    width: 1,
                    auto: true,
                },
                {
                    show: true,
                    spanGaps: false,
                    label: "S9",
                    stroke: "brown",
                    width: 1,
                    auto: true,
                },
                {
                    show: true,
                    spanGaps: false,
                    label: "S10",
                    stroke: "cyan",
                    width: 1,
                    auto: true,
                }
            ],
        };

        let timeArray       = []
        let sensor0Array    = []
        let sensor1Array    = []
        let sensor2Array    = []
        let sensor3Array    = []
        let sensor4Array    = []
        let sensor5Array    = []
        let sensor6Array    = []
        let sensor7Array    = []
        let sensor8Array    = []
        let sensor9Array    = []

        let data = [
            timeArray,
            sensor1Array,
            sensor2Array,
        ]

        let uplot = new window.uPlot(opts, data, this.chartRef.current)

        ipcRenderer.on('storePatientResponse', (event, sampling_id, sync_status) => {
            console.log('sampling id = ' + sampling_id)

            let totalTime = 0
            let startTime = Date.now()
            totalTime = this.state.proses1 + this.state.proses2 + this.state.proses3

            ipcRenderer.on('python-data', (event, data) => {

                let now = parseInt((Date.now() - startTime)/1000)
                let presentase = parseInt((now/totalTime)*100)

                if(presentase >= 100) {


                    this.openModal()
                    // alert('hahaha')

                    ipcRenderer.removeAllListeners('python-data')
                }
                
                data = data.split(';')
                ipcRenderer.send('recording', data, presentase, sampling_id, sync_status)

                timeArray.push(Math.round((new Date()).getTime() / 1000))
                sensor0Array.push(data[0])
                sensor1Array.push(data[1])
                sensor2Array.push(data[2])
                sensor3Array.push(data[3])
                sensor4Array.push(data[4])
                sensor5Array.push(data[5])
                sensor6Array.push(data[6])
                sensor7Array.push(data[7])
                sensor8Array.push(data[8])
                sensor9Array.push(data[9])
                
                let chartData = [
                    timeArray,
                    sensor0Array,
                    sensor1Array,
                    sensor2Array,
                    sensor3Array,
                    sensor4Array,
                    sensor5Array,
                    sensor6Array,
                    sensor7Array,
                    sensor8Array,
                    sensor9Array,
                ];

                uplot.setData(chartData)

            })
        })
    }

    componentWillUnmount(){
        ipcRenderer.removeAllListeners('startResponse')
        ipcRenderer.removeAllListeners('storePatientResponse')
        ipcRenderer.removeAllListeners('python-data')
    }

    render () {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        let isCompleted = this.state.completed === 100 ? true : false;
        
        return (
            <div className="w-full relative">
                <TitleBar
                    title={'Proses Sampling'}
                    back={false}
                    next={false}
                    setBack={() => this.stopChart()}
                ></TitleBar>

                <div className="flex space-x-3 mt-10">
                    <div className="w-1/12 text-center leading-tight">
                        <h3 className="text-2xl font-bold">
                            {this.state.completed}
                            <span className="ml-1 text-xl text-gray-700 font-light">%</span>
                        </h3>
                        <Stopwatch
                            setProgress={this.setProgress}
                            proses1={this.state.proses1}
                            proses2={this.state.proses2}
                            proses3={this.state.proses3}
                        />
                    </div>

                    {/* Progress bar */}
                    <div className="flex-1 relative rounded-lg overflow-hidden">
                        <div className="bg-gray-300 w-full h-full "></div>
                        <div
                        style={{width: `${this.state.completed}%`}}
                        className="absolute top-0 bg-green-500 h-full transition-all ease-out duration-500">
                        </div>
                    </div>
                    
                    {/* If process finished, available to export to .csv */}
                    <div className="w-1/6">
                        {isCompleted
                        ? (<button
                            onClick={() => this.setState({
                                redirect:'/menu'
                            })}
                            className="flex items-center justify-center w-full h-full py-2 bg-orange-600 text-white text-xl rounded-lg">
                                {/* <svg class="w-6 h-6 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg> */}
                                Kembali
                            </button>)
                        : (<button
                            onClick={ this.stopModal }
                            className="flex items-center justify-center w-full h-full py-2 bg-red-600 text-white text-xl rounded-lg">
                                <svg class="w-6 h-6 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                berhenti
                            </button>)
                        }
                    </div>
                </div>

                <div className="mt-10 mb-10 h-72 mx-auto" >
                    <div className="text-center" ref={this.chartRef}></div>
                </div>
            
                {/* Open Modal */}
                
                {this.state.isModalOpen && (
                    <div className="absolute h-full flex items-center bg-white w-full z-1 top-0">
                        <div className="mx-auto bg-white overflow-hidden">
                            <div className="flex items-center p-3">
                                <p className="text-2xl font-semibold text-brand-green">Data berhasil disimpan!</p>
                            </div>
                            <button 
                                onClick={() => this.openModal()}
                                className="bg-green-500 mr-3 w-1/4 p-3 text-xl font-semibold text-white rounded-lg">OK</button>
                            <button 
                                onClick={() => this.setState({redirect: '/menu'})}
                                className="bg-orange-500 w-2/3 p-3 text-xl font-semibold text-white rounded-lg">Data pasien baru</button>
                        </div>
                    </div>
                )}

                {/* Close modal */}

                {/* Stop Modal */}
                
                {this.state.isStopModalOpen && (
                    <div className="absolute h-full flex items-center bg-white w-full z-1 top-0">
                        <div className="mx-auto bg-white overflow-hidden">
                            <div className="flex items-center p-3">
                                <p className="text-2xl font-semibold text-brand-green">Apakah anda yakin membatalkan proses sampling?</p>
                            </div>
                            <div className="text-center space-x-3">
                                <button 
                                    onClick={this.stopChart}
                                    className="bg-green-500 w-1/3 p-3 text-xl font-semibold text-white rounded-lg">YA</button>
                                <button 
                                    onClick={ () => this.setState({isStopModalOpen: false})}
                                    className="bg-red-500 w-1/3 p-3 text-xl font-semibold text-white rounded-lg">Tidak</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Close modal */}
            </div>
        )
    }

}

export default MainChart;
