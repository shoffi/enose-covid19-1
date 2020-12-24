const electron = require('electron');
const path = require('path');
const fs = require('fs');

class Log {
    constructor (opts) {
        const userDataPath = (electron.app || electron.remote.app).getPath('userData');
        this.path = path.join(userDataPath, opts.configName + '.json');
    }

    get(key) {
        return this.data[key];
    }
    
    set(key, val) {
        this.data[key] = val;
        fs.writeFileSync(this.path, JSON.stringify(this.data));
    }

    insert  = (json_data) => {
        fs.readFile(this.path, 'utf8',(err, jsonString) => {
            try {
                let data = JSON.parse(jsonString)
                data.push(json_data)
                fs.writeFileSync(this.path, JSON.stringify(data));
            } catch (error) {
                let data = []
                data.push(json_data)
                fs.writeFileSync(this.path, JSON.stringify(data));
            }
        })
    }
}
  
// expose the class
module.exports = Log