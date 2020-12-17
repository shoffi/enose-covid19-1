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

            diseases: [
                {id: 1, value: "Demam", isChecked: false},
                {id: 2, value: "Flu atau bersin", isChecked: false},
                {id: 3, value: "Sakit Tenggorokan", isChecked: false},
                {id: 4, value: "Batuk", isChecked: false},
                {id: 5, value: "Sulit Bernapas", isChecked: false},
                {id: 6, value: "Mual", isChecked: false},
                {id: 7, value: "Pusing", isChecked: false},
                {id: 8, value: "Mata Berair", isChecked: false},
                {id: 9, value: "Diare", isChecked: false},
            ],

            comorbidities: [
                {id: 1+9, value: "Hipertensi", isChecked: false},
                {id: 2+9, value: "Diabetes Mellitus", isChecked: false},
                {id: 3+9, value: "Gangguan Imun", isChecked: false},
                {id: 4+9, value: "Liver atau Penyakit Hati", isChecked: false},
                {id: 5+9, value: "Ginjal", isChecked: false},
                {id: 6+9, value: "Gangguan Pernapasan", isChecked: false},
                {id: 7+9, value: "Kanker", isChecked: false},
                {id: 8+9, value: "Tuberkulosis", isChecked: false},
                {id: 9+9, value: "Penyakit Kardiovaskular", isChecked: false},
            ]
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handlePatientId = this.handlePatientId.bind(this)
        this.startSampling = this.startSampling.bind(this)
    }

    componentDidMount(){
        console.log("componentDidMount")
        console.log(this.props)
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

    render () {
        if (this.state.redirect) {
            console.log(this.state) 
            return <Redirect 
                        to={{
                            pathname: this.state.redirect,
                            state: this.state
                        }}
                    />
        }
        
        return (
            <div>
                <TitleBar
                    title={'Gejala Pasien'}
                    back={true}
                    next={true}
                    setBack={() => this.setState({redirect: '/patient-detail'})}
                    setNext={() => this.startSampling()}
                    setNextName={'Start Sampling'}
                ></TitleBar>

                <div className="py-8">
                    <div className="flex justify-center">
                        <div className="w-2/3">
                            <p className="text-center text-xl font-light leading-snug text-gray-800">
                                Pilih sesuai dengan gejala yang dirasakan pasien saat ini. Jika pasien Negatif, silahkan pilih opsi <span className="font-semibold text-green-700">Negatif Covid-19</span>.
                            </p>
                        </div>
                    </div>
                    <hr className="border my-3" />
                    <div className="flex items-center space-x-4">
                        <div className="w-1/2">
                            <p className="text-xl font-light leading-snug text-gray-800">
                            Pilih sesuai dengan gejala yang dirasakan pasien saat ini. Jika pasien Negatif, silahkan pilih opsi <span className="font-semibold text-green-700">Negatif Covid-19</span>.
                            </p>
                        </div>
                        <div className="w-1/2 bg-green-200 bg-opacity-25 p-3 rounded-xl">
                            <label class="inline-flex items-center w-full">
                                <input
                                    type="checkbox"
                                    checked={this.state.covidStatus}
                                    onClick={this.handleCovidStatus}
                                    class="form-checkbox h-8 w-8 text-green-600 rounded-xl"
                                ></input>
                                <span class="ml-3 text-gray-800 text-xl">Negative COVID-19</span>
                            </label>
                        </div>
                    </div>
                    <hr className="border my-3" />
                    <div className="flex space-x-4 h-64 scrolling-touch overflow-y-scroll">
                        <div className="w-1/2">
                            <h3 className="text-lg text-gray-800 font-semibold mb-3 px-3">Gejala</h3>
                            <div className="bg-purple-200 bg-opacity-25 p-3 rounded-xl">
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
                            <div className="bg-yellow-200 bg-opacity-25 p-3 rounded-xl">
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

                {/* <div className="mt-5">
                    <div 
                        className="col-md-12 ml-auto mr-auto"
                        style={{
                            fontSize: '25px'
                        }} 
                    >
                        <form onSubmit={this.handleSubmit}>
                            
                            <div className="row">
                            
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label>ID Pasien:</label>
                                        <input 
                                            className="form-control" 
                                            type="text" 
                                            value={this.props.patientId} 
                                            onChange={this.handlePatientId}
                                            style={{
                                                fontSize: "25px"
                                            }} 
                                        />
                                    </div>

                                    <div className="form-group">
                                        <input 
                                            type="checkbox"
                                            style={{
                                                width: "25px",
                                                height: "25px",
                                                marginRight: "10px",
                                                marginBottom: "10px",
                                                marginTop: "10px"
                                            }} 
                                        />
                                        <label className="ml-2">Negatif Covid-19</label>
                                    </div>
                                </div>
                                
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <h4>Symptoms</h4>
                                        {
                                            this.state.diseases.map((disease) => {
                                                return (<CheckBox handleCheckboxes={this.handleDiseaseCheckboxes} {...disease} />)
                                            })
                                        }
                                    </div>
                                </div>
                                    
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <h4>Comorbidities</h4>
                                        <CheckBox handleCheckboxes={this.handleComorbiditiesCheckboxes} {...this.state.comorbidities[0]} />
                                        <CheckBox handleCheckboxes={this.handleComorbiditiesCheckboxes} {...this.state.comorbidities[1]} />
                                        <CheckBox handleCheckboxes={this.handleComorbiditiesCheckboxes} {...this.state.comorbidities[2]} />
                                        <CheckBox handleCheckboxes={this.handleComorbiditiesCheckboxes} {...this.state.comorbidities[3]} />
                                        <CheckBox handleCheckboxes={this.handleComorbiditiesCheckboxes} {...this.state.comorbidities[4]} />
                                        <CheckBox handleCheckboxes={this.handleComorbiditiesCheckboxes} {...this.state.comorbidities[5]} />
                                        <CheckBox handleCheckboxes={this.handleComorbiditiesCheckboxes} {...this.state.comorbidities[6]} />
                                        <CheckBox handleCheckboxes={this.handleComorbiditiesCheckboxes} {...this.state.comorbidities[7]} />
                                        <CheckBox handleCheckboxes={this.handleComorbiditiesCheckboxes} {...this.state.comorbidities[8]} />
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="form-group">
                                        <h4>Comorbidities</h4>
                                        <CheckBox handleCheckboxes={this.handleComorbiditiesCheckboxes} {...this.state.comorbidities[9]} />
                                        <CheckBox handleCheckboxes={this.handleComorbiditiesCheckboxes} {...this.state.comorbidities[10]} />
                                    </div>
                                </div>
                                
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <input 
                                            style={{
                                                borderRadius:'20px', 
                                                width:'100%',
                                                fontSize: '35px'
                                            }} 
                                            className="btn btn-success"
                                            type="submit" 
                                            value="Start Sampling" 
                                        />
                                    </div>
                                </div>
                            </div>

                        </form>
                        <button 
                            style={{
                                borderRadius:'20px', 
                                width:'100%',
                                fontSize: '35px'
                            }} 
                            className="btn btn-warning mb-5" 
                            onClick={() => this.setState({redirect: '/menu'})}
                        >
                            Kembali
                        </button>
                    </div>                    
                </div> */}
            </div>
        )
    }
}

export default AmbilSample;
