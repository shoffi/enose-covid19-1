import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import TitleBar from '../Nav/TitleBar';

class AmbilSample extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            redirect: null,

            nurse_id: this.props.nurseId,
            ruang_id: this.props.ruangId,
            patient_id: this.props.patientId,
            covidStatus: this.props.covidStatus,

            suhuTubuh: this.props.suhuTubuh,
            asamUrat: this.props.asamUrat,
            kolestrol: this.props.kolestrol,
            saturasiOksigen: this.props.saturasiOksigen,
            gulaDarah: this.props.gulaDarah,
            denyutJantung: this.props.denyutJantung,

            pcr_tool: '',
            ct_pcr: this.props.ctPcr,
            isModalOpen: false,

            hasilSwab: [
                { id: 1, value: 'Negatif Covid-19'},
                { id: 2, value: 'Positif Covid-19'},
                { id: 3, value: 'Tidak diketahui'},
            ],

            isHasilSelected: false,

            alatPCR: [
                { id: 1, value: 'A'},
                { id: 2, value: 'B'},
                { id: 3, value: 'C'},
                { id: 4, value: 'D'},
                { id: 5, value: 'E'},
            ],

            isPCRSelected: false,

            diseases: [
                {id: 4, value: "Batuk", isChecked: false},
                {id: 1, value: "Demam", isChecked: false},
                {id: 9, value: "Diare", isChecked: false},
                {id: 2, value: "Flu atau bersin", isChecked: false},
                {id: 10, value: "Gangguan Pencernaan", isChecked: false},
                {id: 11, value: "Gangguan Penciuman", isChecked: false},
                {id: 8, value: "Mata Berair", isChecked: false},
                {id: 6, value: "Mual", isChecked: false},
                {id: 7, value: "Pusing", isChecked: false},
                {id: 3, value: "Sakit Tenggorokan", isChecked: false},
                {id: 5, value: "Sulit Bernapas", isChecked: false},
            ],

            comorbidities: [
                {id: 2+9, value: "Diabetes Mellitus", isChecked: false},
                {id: 3+9, value: "Gangguan Imun", isChecked: false},
                {id: 6+9, value: "Gangguan Pernapasan", isChecked: false},
                {id: 5+9, value: "Ginjal", isChecked: false},
                {id: 1+9, value: "Hipertensi", isChecked: false},
                {id: 7+9, value: "Kanker", isChecked: false},
                {id: 4+9, value: "Liver atau Hati", isChecked: false},
                {id: 9+9, value: "Kardiovaskular", isChecked: false},
                {id: 8+9, value: "Tuberkulosis", isChecked: false},
            ]
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handlePatientId = this.handlePatientId.bind(this)
        this.startSampling = this.startSampling.bind(this)
        this.toggleHasil = this.toggleHasil.bind(this)
        this.togglePCR = this.togglePCR.bind(this)
    }

    componentDidMount(){
        console.log("AmbilSample.js")
    }

    handleSubmit (event) {
        event.preventDefault()
        this.setState({
            redirect: '/main-chart'
        })
    }

    handleDiseaseCheckboxes = (event) => {
        let diseases = this.state.diseases
        diseases.forEach(disease => {
           if (disease.value === event.target.value)
              disease.isChecked =  event.target.checked
        })
        this.setState({diseases: diseases})
    }

    handleComorbiditiesCheckboxes = (event) => {
        let comorbidities = this.state.comorbidities
        comorbidities.forEach(comorbidity => {
           if (comorbidity.value === event.target.value)
              comorbidity.isChecked =  event.target.checked
        })
        this.setState({comorbidities: comorbidities})
    }

    handlePatientId = (event) => {
        this.props.setPatientId(event)
        this.setState({
            patient_id: event.target.value
        })
    }

    handleCovidStatus = (event) => {
        this.setState({
            covidStatus: event.target.checked
        })
    }

    startSampling = () => {
        this.setState({
            redirect: '/main-chart'
        })
    }

    toggleHasil() {
        this.setState({
            isHasilSelected: !this.state.isHasilSelected
        })
    }
    togglePCR() {
        this.setState({
            isPCRSelected: !this.state.isPCRSelected
        })
    }

    render () {
        if (this.state.redirect) {
            // console.log(this.state)
            return <Redirect 
                        to={{
                            pathname: this.state.redirect,
                            state: this.state
                        }}
                    />
        }
        
        return (
            <div className="relative w-full">
                {!this.state.isModalOpen && (
                    <TitleBar
                        title={'Gejala Pasien'}
                        back={true}
                        next={true}
                        setBack={() => this.setState({redirect: '/symptom-patient'})}
                        setNext={() => this.setState({isModalOpen:true})}
                        setNextName={'Proses Sampling'}
                    ></TitleBar>
                )}

                <div className="py-8">

                    <div className="flex space-x-4 mt-6">
                        <div className="w-1/2">
                            <h3 className="text-lg text-gray-800 font-semibold mb-3 px-3">Gejala</h3>
                            <div className="bg-purple-200 bg-opacity-25 p-3 rounded-xl h-72 scrolling-touch overflow-y-scroll">
                                {this.state.diseases.map(item => (
                                    <div className="w-full">
                                        <label class="inline-flex items-center w-full">
                                            <input
                                                type="checkbox"
                                                checked={item.isChecked}
                                                onClick={this.handleDiseaseCheckboxes}
                                                value={item.value}
                                                class="form-checkbox h-8 w-8 text-purple-600 rounded-xl"
                                            ></input>
                                            <span class="ml-3 text-gray-800 text-xl">{item.value}</span>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="w-1/2">
                            <h3 className="text-lg text-gray-800 font-semibold mb-3 px-3">Penyakit Bawaan</h3>
                            <div className="bg-yellow-200 bg-opacity-25 p-3 rounded-xl h-72 scrolling-touch overflow-y-scroll">
                                {this.state.comorbidities.map(item => (
                                    <div className="w-full">
                                        <label class="inline-flex items-center w-full">
                                            <input
                                                type="checkbox"
                                                checked={item.isChecked}
                                                onClick={this.handleComorbiditiesCheckboxes}
                                                value={item.value}
                                                class="form-checkbox h-8 w-8 text-orange-600 rounded-xl"
                                            ></input>
                                            <span class="ml-3 text-gray-800 text-xl">{item.value}</span>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Open Modal */}
                
                {this.state.isModalOpen && (
                    <div className="absolute h-full flex items-center bg-white w-full z-1 top-0">
                        <div className="w-full mx-auto bg-white overflow-hidden text-center">
                            <div className="items-center p-5">
                                <p className="text-4xl font-semibold text-brand-green ">Siapkan selang dan pasang di ketiak!</p>
                            </div>
                            <div className="space-x-3 text-center">
                                <button 
                                    onClick={ () => this.startSampling() }
                                    className="bg-green-500 w-1/3 p-3 text-xl font-semibold text-white rounded-lg">Start Sampling</button>
                                <button 
                                    onClick={ () => this.setState({isModalOpen:false}) }
                                    className="bg-orange-500 w-1/3 p-3 text-xl font-semibold text-white rounded-lg">Edit Gejala</button>
                            </div>
                        </div>
                    </div>
                )}

                Close modal
            </div>
        )
    }
}

export default AmbilSample;
