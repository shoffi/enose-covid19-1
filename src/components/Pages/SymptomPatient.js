import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import TitleBar from '../Nav/TitleBar';
import CustomInput from '../Form/customInput';

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
            hasilSwab: [
                { id: 1, value: 'Negatif Covid-19'},
                { id: 2, value: 'Negatif - Infeksi paru-paru'},
                { id: 3, value: 'Positif - Tanpa gejala'},
                { id: 4, value: 'Positif - Ringan'},
                { id: 5, value: 'Positif - Sedang/moderat'},
                { id: 6, value: 'Positif - Berat/Pneumonia Berat'},
                { id: 7, value: 'Positif - Kritis'},
                { id: 8, value: 'Tidak diketahui'},
            ],
            isHasilSelected: false,
            bloodAnalysis: [
                { id: 5, value: 'Normal'},
                { id: 1, value: 'Asidosis respiratorik'},
                { id: 2, value: 'Asidosis metabolik'},
                { id: 3, value: 'Alkalosis resporatorik'},
                { id: 4, value: 'Alkalosis metabolik'},
            ],
            isbloodAnalysisSelected: false,
            alatPCR: [
                { id: 1, value: 'A'},
                { id: 2, value: 'B'},
                { id: 3, value: 'C'},
                { id: 4, value: 'D'},
                { id: 5, value: 'E'},
            ],
            isPCRSelected: false,
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handlePatientId = this.handlePatientId.bind(this)
        this.startSampling = this.startSampling.bind(this)
        this.toggleHasil = this.toggleHasil.bind(this)
        this.togglePCR = this.togglePCR.bind(this)
        this.toggleAnalysis = this.toggleAnalysis.bind(this)
    }

    componentDidMount(){
        console.log("SymptomPatient.js")
        console.log(this.props.suhuTubuh)
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

    toggleHasil(hasil_id) {
        this.setState({
            isHasilSelected: !this.state.isHasilSelected
        })
        
        if(hasil_id > 0) {
            this.props.setCovidStatus(hasil_id)
        }
    }

    togglePCR(pcr_id) {
        this.setState({
            isPCRSelected: !this.state.isPCRSelected
        })
        if(pcr_id > 0) {
            this.props.setPcrTool(pcr_id)
        }
    }

    toggleAnalysis(analysis_id) {
        this.setState({
            isbloodAnalysisSelected: !this.state.isbloodAnalysisSelected
        })
        if(analysis_id > 0) {
            this.props.setBloodAnalysis(analysis_id)
        }
    }

    render () {
        if (this.state.redirect) {
            // console.log(this.state) 
            return <Redirect 
                        to={{
                            pathname: this.state.redirect,
                            // state: this.state
                        }}
                    />
        }

        if(this.props.covidStatus == 8){
            if(this.props.ctPcr != ''){
                this.props.setPcrTool('')
                this.props.setCtPcr('')
            }
        }

        let hasil_swab;
        switch (this.props.covidStatus) {
            case 1:
                hasil_swab = 'Negatif Covid-19'
                break;

            case 2:
                hasil_swab = 'Positif - Tanpa gejala'
                break;
            
            case 3:
                hasil_swab = 'Positif - Tanpa gejala'
                break;

            case 4:
                hasil_swab = 'Positif - Ringan'
                break;

            case 5:
                hasil_swab = 'Positif - Sedang/Moderat'
                break;

            case 6:
                hasil_swab = 'Positif - Berat/Pneumonia Berat'
                break;
            
            case 7:
                hasil_swab = 'Positif - Kritis'
                break;
            
            case 8:
                hasil_swab = 'Tidak diketahui'
                break;
            
            default:
                hasil_swab = 'Pilih Salah Satu'
                break;
        }

        let alatPcr;
        switch (this.props.pcrTool) {
            case 1:
                alatPcr = "PCR Tipe A"
                break;
            
            case 2:
                alatPcr = "PCR Tipe B"
                break;

            case 3:
                alatPcr = "PCR Tipe C"
                break;

            case 4:
                alatPcr = "PCR Tipe D"
                break;

            case 5:
                alatPcr = "PCR Tipe E"
                break;
            
            default:
                alatPcr = 'Pilih Salah Satu'
                break;
        }

        let bloodAnalysis;
        switch (this.props.bloodAnalysis) {
            case 5:
                bloodAnalysis = "Normal"
                break;

            case 1:
                bloodAnalysis = "Asidosis respiratorik"
                break;
            
            case 2:
                bloodAnalysis = "Asidosis metabolik"
                break;

            case 3:
                bloodAnalysis = "Alkalosis respiratorik"
                break;

            case 4:
                bloodAnalysis = "Alkalosis metabolik"
                break;
            
            default:
                bloodAnalysis = 'Pilih Salah Satu'
                break;
        }
        
        return (
            <div>
                <TitleBar
                    title={'Hasil Lab'}
                    back={true}
                    next={true}
                    setBack={() => this.setState({redirect: '/patient-detail'})}
                    setNext={
                        () => {
                            if(this.props.covidStatus == ''){
                                // alert(this.props.covidStatus)
                                alert('Hasil Swab harus diisi!')
                            }else{
                                this.setState({redirect: '/ambil-sample'})
                            }
                        }
                    }
                    setNextName={'Gejala Pasien'}
                ></TitleBar>

                <div className="py-8">
                  <div className="flex items-start space-x-4">

                      <div className="w-1/3 relative">
                          <p className="text-brand-green font-semibold mb-1">Hasil Swab</p>
                          <button
                          onClick = { () => this.toggleHasil(-1) }
                          className="flex w-full items-center bg-gray-200 border-4 border-gray-200 focus:outline-none rounded-lg">
                              <p
                              className="text-xl text-left flex-1 px-3 py-1">
                                {hasil_swab}
                              </p>
                              <svg class="w-8 h-8 text-brand-orange mx-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7"></path></svg>
                          </button>
                          <p className="text-xs text-gray-700 leading-tight mt-2">Jika tidak ada hasil swab hari ini, maka pilih<br /><span className="font-bold text-brand-green">tidak diketahui</span></p>
                          { this.state.isHasilSelected && (<div className="absolute z-10 h-56 scrolling-touch overflow-y-scroll border bg-white w-full mt-2 rounded-md py-1 divide-y">
                              { this.state.hasilSwab.map(hasil => (
                                  <div
                                  key = { hasil.id }
                                  onClick = { () => this.toggleHasil(hasil.id) }
                                  className="p-2 cursor-pointer">{ hasil.value }</div>
                              )) }
                          </div>)}
                      </div>

                    { (this.props.covidStatus != 8) &&
                        (
                            <>
                            <div className="w-1/3 relative">
                                <p className="text-brand-green font-semibold mb-1">Alat PCR</p>
                                <button
                                onClick = { () => this.togglePCR(-1) }
                                className="flex w-full items-center bg-gray-200 border-4 border-gray-200 focus:outline-none rounded-lg">
                                    <p
                                    className="text-xl text-left flex-1 px-4 py-1">
                                        {alatPcr}
                                    </p>
                                    <svg class="w-8 h-8 text-brand-orange mx-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7"></path></svg>
                                </button>
                                { this.state.isPCRSelected && (<div className="absolute z-10 border bg-white w-full mt-2 rounded-md py-2 divide-y">
                                    { this.state.alatPCR.map(pcr => (
                                        <div
                                        key = { pcr.id }
                                        onClick = { () => this.togglePCR(pcr.id) }
                                        className="p-2 cursor-pointer">PCR Tipe { pcr.value }</div>
                                    )) }
                                </div>)}
                            </div>

                            <div className="w-1/3">
                                <CustomInput
                                    data={this.props.ctPcr}
                                    value={this.props.ctPcr}
                                    label={"CT PCR"}
                                    unit={""}
                                    onchange={ this.props.setCtPcr }
                                />
                            </div>
                            </>
                        )
                    }

                  </div>
                  <hr className="my-5" />
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                        <p className="text-brand-green font-semibold mb-1">Blood Gas Analysis</p>
                        <button
                        onClick = { () => this.toggleAnalysis(-1) }
                        className="flex items-center bg-gray-200 border-4 border-gray-200 focus:outline-none rounded-lg">
                            <p
                            className="text-xl text-left flex-1 px-3 py-1">
                                {bloodAnalysis}
                            </p>
                            <svg class="w-8 h-8 text-brand-orange mx-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7"></path></svg>
                        </button>
                        { this.state.isbloodAnalysisSelected && 
                            (
                                <div className="absolute z-10 h-56 scrolling-touch overflow-y-scroll border bg-white mt-2 rounded-md py-1 divide-y">
                                    { this.state.bloodAnalysis.map(hasil => (
                                        <div
                                        key = { hasil.id }
                                        onClick = { () => this.toggleAnalysis(hasil.id) }
                                        className="p-2 cursor-pointer">{ hasil.value }</div>
                                    )) }
                                </div>
                            )}
                    </div>
                    <div>
                        <CustomInput
                        data={this.props.ddimer}
                        value={this.props.ddimer}
                        label={"D-Dimer"}
                        unit={"ng/ml"}
                        onchange={ this.props.setDdimer }
                        />
                    </div>
                    <div>
                        <CustomInput
                        data={this.props.hemoglobin}
                        value={this.props.hemoglobin}
                        label={"Hemoglobin"}
                        unit={"Hgb"}
                        onchange={ this.props.setHemoglobin }
                        />
                    </div>
                    <div>
                        <CustomInput
                        data={this.props.leukosit}
                        value={this.props.leukosit}
                        label={"Leukosit"}
                        unit={"Wbc"}
                        onchange={ this.props.setLeukosit }
                        />
                    </div>
                    <div>
                        <CustomInput
                        data={this.props.trombosit}
                        value={this.props.trombosit}
                        label={"Trombosit"}
                        unit={"Plt"}
                        onchange={ this.props.setTrombosit }
                        />
                    </div>
                    <div>
                        <CustomInput
                        data={this.props.LED}
                        value={this.props.LED}
                        label={"LED"}
                        unit={""}
                        onchange={ this.props.setLED }
                        />
                    </div>
                    <div>
                        <CustomInput
                        data={this.props.LED}
                        value={this.props.LED}
                        label={"Limfosit"}
                        unit={"Lymph"}
                        onchange={ this.props.setLED }
                        />
                    </div>
                  </div>

                </div>
            </div>
        )
    }
}

export default AmbilSample;
