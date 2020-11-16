import React, { Component, createRef } from "react";
import { Redirect } from 'react-router-dom';
import Chart from "chart.js";
// import ProgressBar from "../ProgressBar";
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
        }

        this.chartRef = createRef();
        this.setProgress = this.setProgress.bind(this);
        this.stopChart = this.stopChart.bind(this);
    }

    componentDidMount() {
        
        let arrayAll = []
        let diseases = Object.values(this.props.location.state.diseases)
        let resultDisease = Object.keys(diseases).map( (key) => [diseases[key].isChecked ] )
        let comorbidities = Object.values(this.props.location.state.comorbidities)
        let resultComorbidities = Object.keys(comorbidities).map( (key) => [comorbidities[key].isChecked ] )
        arrayAll = resultDisease.concat(resultComorbidities)
        // console.log(this.props)

        let detailPatient = {
            'nurse_id': this.props.location.state.nurse_id,
            'patient_id': this.props.location.state.patient_id,
            'ruang_id': this.props.location.state.ruang_id,
        }
        
        // console.log("detailPatient "+detailPatient)

        ipcRenderer.send('storePatient', arrayAll, detailPatient)
        
        let pengambilan_id
        
        ipcRenderer.on('storePatientResponse', (event, storePatientResponse) => {
            console.log('pasien id = ' + storePatientResponse)
            pengambilan_id = storePatientResponse
            let totalTime = 0
            totalTime = this.state.proses1 + this.state.proses2 + this.state.proses3
            ipcRenderer.send('start', pengambilan_id, totalTime)
        })

        this.myChart = new Chart (this.chartRef.current, {
            type: 'line',
            data: {
                labels: [''],
                datasets: [
                    {
                        label: 'MQ2_LPG',
                        data: [''],
                        borderColor: [
                            'red',
                        ],
                        borderWidth: 1,
                        fill: false
                    },
                    {
                        label: 'MQ2_CO',
                        data: [''],
                        borderColor: [
                            'orange',
                        ],
                        borderWidth: 1,
                        fill: false
                    },
                    {
                        label: 'MQ2_SMOKE',
                        data: [''],
                        borderColor: [
                            'pink',
                        ],
                        borderWidth: 1,
                        fill: false
                    },
                    {
                        label: 'MQ2_ALCOHOL',
                        data: [''],
                        borderColor: [
                            'green',
                        ],
                        borderWidth: 1,
                        fill: false
                    },
                    {
                        label: 'MQ2_CH4',
                        data: [''],
                        borderColor: [
                            'blue',
                        ],
                        borderWidth: 1,
                        fill: false
                    },
                    {
                        label: 'MQ2_H2',
                        data: [''],
                        borderColor: [
                            'indigo',
                        ],
                        borderWidth: 1,
                        fill: false
                    },
                    {
                        label: 'MQ2_PROPANE',
                        data: [''],
                        borderColor: [
                            'violet',
                        ],
                        borderWidth: 1,
                        fill: false
                    }
                ]
            },
            options: {
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });

        ipcRenderer.on('startResponse', (event, startResponse) => {
            let responseArray = ['']
            responseArray = startResponse.split(";")
            // console.log('responseArray = '+responseArray)

            let time = new Date()
            time = time.toLocaleTimeString().toString() 
            
            // MQ2
            this.addData(this.myChart, 0, time, responseArray[0])
            this.addData(this.myChart, 1, null, responseArray[1])
            this.addData(this.myChart, 2, null, responseArray[2])
            this.addData(this.myChart, 3, null, responseArray[3])
            this.addData(this.myChart, 4, null, responseArray[4])
            this.addData(this.myChart, 5, null, responseArray[5])
            this.addData(this.myChart, 6, null, responseArray[6])
        })
    
    }

    addData(chart, num, label, data) {
        if(label != null){
            chart.data.labels.push(label)
            // chart.data.labels.shift()
        }
        chart.data.datasets[num].data.push(data)
        // chart.data.datasets[num].data.shift()
        chart.update()
    }

    setProgress (completed) {
        this.setState({
            completed: completed
        })
    }

    stopChart () {
        console.log('stoppppp')
        ipcRenderer.send('stop')
        this.setState({redirect: '/ambil-sample'})
    }

    render () {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        let isCompleted = this.state.completed === 100 ? true : false;
        
        return (
            <div>
                <TitleBar
                    title={'Proses Sampling'}
                    back={isCompleted}
                    next={false}
                    setBack={() => this.setState({redirect: '/ambil-sample'})}
                ></TitleBar>

                <div className="relative mt-10 mb-1 h-72">
                    <canvas ref={this.chartRef} />
                </div>

                <div className="flex space-x-3">
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
                            className="flex items-center justify-center w-full h-full py-2 bg-green-600 text-white text-xl rounded-lg">
                                <svg class="w-6 h-6 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                Export
                            </button>)
                        : (<button
                            onClick={ this.stopChart }
                            className="flex items-center justify-center w-full h-full py-2 bg-red-600 text-white text-xl rounded-lg">
                                <svg class="w-6 h-6 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                berhenti
                            </button>)
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default MainChart;
