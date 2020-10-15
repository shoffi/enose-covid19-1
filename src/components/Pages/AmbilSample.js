import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import CheckBox from "../Utilities/Checkbox";

class AmbilSample extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            redirect: null,
            diseases: [
                {id: 1, value: "Fever", isChecked: false},
                {id: 2, value: "Flu/Sneeze", isChecked: false},
                {id: 3, value: "Sore Throat", isChecked: false},
                {id: 4, value: "Cough", isChecked: false},
                {id: 5, value: "Diff breath", isChecked: false},
                {id: 6, value: "Nausea", isChecked: false},
                {id: 7, value: "Headache", isChecked: false},
                {id: 8, value: "Watery eyes", isChecked: false},
                {id: 9, value: "Diarrhea", isChecked: false},
            ],
            comorbidities: [
                {id: 1, value: "Hypertension", isChecked: false},
                {id: 2, value: "Diabetes Mellitus", isChecked: false},
                {id: 3, value: "Cardiovascular disease", isChecked: false},
                {id: 4, value: "Heart disease", isChecked: false},
                {id: 5, value: "Kidney disease", isChecked: false},
                {id: 6, value: "Respiratory system disease", isChecked: false},
                {id: 7, value: "Astma", isChecked: false},
                {id: 8, value: "Cancer", isChecked: false},
                {id: 9, value: "Tuberkulosis", isChecked: false},
                {id: 10, value: "Liver disease", isChecked: false},
                {id: 11, value: "Immune disorders", isChecked: false},
            ]
        }

        this.handleSubmit = this.handleSubmit.bind(this)
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

    render () {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        
        return (
            <>
                <button style={{width:'100%'}} className="btn btn-warning mt-5 mb-5" onClick={() => this.setState({redirect: '/menu'})}>Kembali</button>
                <div className="mt-5">
                    <div className="col-md-8 ml-auto mr-auto">
                        <form onSubmit={this.handleSubmit}>
                            
                            <div className="form-group">
                                <label>ID Pasien:</label>
                                <input className="form-control" type="text" value={this.props.patientId} onChange={this.props.setPatientId} />
                            </div>

                            <div className="form-group">
                                <input type="checkbox" />
                                <label className="ml-2">Negatif Covid-19</label>
                            </div>

                            <div className="form-group">
                            {
                                this.state.diseases.map((disease) => {
                                    return (<CheckBox handleCheckboxes={this.handleDiseaseCheckboxes} {...disease} />)
                                })
                            }
                            </div>

                            <div className="form-group">
                            {
                                this.state.comorbidities.map((comorbidity) => {
                                    return (<CheckBox handleCheckboxes={this.handleComorbiditiesCheckboxes} {...comorbidity} />)
                                })
                            }
                            </div>

                            <input type="submit" value="Start Sampling" />
                        </form>
                    </div>
                </div>
            </>
        )
    }
}

export default AmbilSample;