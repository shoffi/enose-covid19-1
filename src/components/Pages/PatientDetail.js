import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import CustomInput from '../Form/customInput';

// import Keyboard from "react-simple-keyboard";
// import CustomInput from '../Form/customInput.js';

import TitleBar from '../Nav/TitleBar'
import '../../styles/keyboard.css'

class PatientDetail extends Component {

    constructor (props){
        super (props)

        this.state = {
            redirect: null,
            isFocus: false,
            times: [
                { id: 1, value: 'Pagi'},
                { id: 2, value: 'Siang'},
                { id: 3, value: 'Malam'},
            ],
            isTimesSelected: false,

            allInputs: {},
            inputName: 'default',
            layoutName: 'numeric',
        }

        this.keyboard = React.createRef()

        this.toggleWaktu = this.toggleWaktu.bind(this)
        this.toggleKeyboard = this.toggleKeyboard.bind(this)
    }

    toggleWaktu() {
        this.setState({
            isTimesSelected: !this.state.isTimesSelected
        })
    }

    setSymptom() {
        this.setState({
            allInputs: { ...this.state.allInputs, SuhuTubuh: this.state.allInputs.SuhuTubuh }
        })
    }

    toggleKeyboard() {
        this.setState({
            isFocus: !this.state.isFocus
        })
    }

    componentDidMount(){
        console.log('PatientDetail.js')
    }

    focusKeyboard() {
        this.keyboard.current.onFocus();
    }

    render () {
        if (this.state.redirect) {
            return  <Redirect 
                        to={{
                            pathname: this.state.redirect,
                            state: this.state.allInputs
                        }} 
                    />
        }

        return (
            <div>
                <TitleBar
                    title={'Tanda-tanda Vital'}
                    back={true}
                    next={true}
                    setBack={() => this.setState({redirect: '/register-patient'})}
                    setNext={() => this.setState({redirect: '/symptom-patient'})}
                    setNextName={'Hasil Lab'}
                ></TitleBar>

                <div className="flex mx-auto pt-6 space-x-6">

                    <div className="grid grid-cols-3 gap-3">
                        <div>
                            <CustomInput
                            data={ this.props.suhuTubuh }
                            value={ this.props.suhuTubuh }
                            label={"Suhu Tubuh"}
                            unit={"°C"}
                            onchange={ this.props.setSuhuTubuh }
                            />
                            {/* <p className="text-xl mb-1">Suhu Tubuh</p>
                            <div className="relative">
                                <input
                                    type="text"
                                    onFocus={() => this.setState({inputName: 'SuhuTubuh'})}
                                    value = { this.state.allInputs.SuhuTubuh }
                                    onChange={ (event) => {
                                        this.props.setSuhuTubuh(event.target.value)
                                        this.setState({
                                            allInputs: { ...this.state.allInputs, SuhuTubuh: event.target.value }
                                        })
                                    } }
                                    className="w-full text-2xl font-semibold pl-3 pr-10 py-2 bg-gray-200 placeholder-gray-400 outline-none border-4 border-gray-200 focus:border-brand-orange rounded-lg"
                                    placeholder="36.5"
                                />
                                <p className="mx-3 text-xl text-gray-600 flex items-center absolute inset-y-0 right-0">°C</p>
                            </div> */}
                        </div>
                        <div>
                            <CustomInput
                            data={ this.props.asamUrat }
                            value={ this.props.asamUrat }
                            label={"Asam urat"}
                            unit={"mg/dL"}
                            onchange={ this.props.setAsamUrat }
                            />
                            {/* <p className="text-xl mb-1">Asam Urat</p>
                            <div className="relative">
                                <input
                                    type="text"
                                    // value={this.props.asamUrat}
                                    // onChange={this.props.setAsamUrat}
                                    onFocus={() => this.setState({inputName: 'AsamUrat'})}
                                    value = { this.state.allInputs.AsamUrat }
                                    onChange={ (event) => {
                                        this.props.setAsamUrat(event.target.value)
                                        this.setState({
                                            allInputs: { ...this.state.allInputs, AsamUrat: event.target.value }
                                        })
                                    } }
                                    className="w-full text-2xl font-semibold pl-3 pr-10 py-2 bg-gray-200 placeholder-gray-400 outline-none border-4 border-gray-200 focus:border-brand-orange rounded-lg"
                                    placeholder="7.5"
                                />
                                <p className="mx-3 text-xl text-gray-600 flex items-center absolute inset-y-0 right-0">mg/dL</p>
                            </div> */}
                        </div>
                        <div>
                            <CustomInput
                            data={ this.props.kolestrol }
                            value={ this.props.kolestrol }
                            label={"Kolesterol"}
                            unit={"mg/dL"}
                            onchange={ this.props.setKolestrol }
                            />
                            {/* <p className="text-xl mb-1">Kolesterol</p>
                            <div className="relative">
                                <input
                                    type="text"
                                    // value={this.props.kolestrol}
                                    // onChange={this.props.setKolestrol}
                                    onFocus={() => this.setState({inputName: 'Kolestrol'})}
                                    value = { this.state.allInputs.Kolestrol }
                                    onChange={ (event) => {
                                        this.props.setKolestrol(event.target.value)
                                        this.setState({
                                            allInputs: { ...this.state.allInputs, Kolestrol: event.target.value }
                                        })
                                    } }
                                    className="w-full text-2xl font-semibold pl-3 pr-10 py-2 bg-gray-200 placeholder-gray-400 outline-none border-4 border-gray-200 focus:border-brand-orange rounded-lg"
                                    placeholder="200"
                                />
                                <p className="mx-3 text-xl text-gray-600 flex items-center absolute inset-y-0 right-0">mg/dL</p>
                            </div> */}
                        </div>
                        <div>
                            <CustomInput
                            data={ this.props.saturasiOksigen }
                            value={ this.props.saturasiOksigen }
                            label={"Saturasi Oksigen"}
                            unit={"%"}
                            onchange={ this.props.setSaturasiOksigen }
                            />
                            {/* <p className="text-xl mb-1">Saturasi Oksigen</p>
                            <div className="relative">
                                <input
                                    type="text"
                                    // value={this.props.saturasiOksigen}
                                    // onChange={this.props.setSaturasiOksigen}
                                    onFocus={() => this.setState({inputName: 'SaturasiOksigen'})}
                                    value = { this.state.allInputs.SaturasiOksigen }
                                    onChange={ (event) => {
                                        this.props.setSaturasiOksigen(event.target.value)
                                        this.setState({
                                            allInputs: { ...this.state.allInputs, SaturasiOksigen: event.target.value }
                                        })
                                    } }
                                    className="w-full text-2xl font-semibold pl-3 pr-10 py-2 bg-gray-200 placeholder-gray-400 outline-none border-4 border-gray-200 focus:border-brand-orange rounded-lg"
                                    placeholder="95"
                                />
                                <p className="mx-3 text-xl text-gray-600 flex items-center absolute inset-y-0 right-0">%</p>
                            </div> */}
                        </div>
                        <div>
                            <CustomInput
                            data={ this.props.gulaDarah }
                            value={ this.props.gulaDarah }
                            label={"Gula Darah"}
                            unit={"mg/dL"}
                            onchange={ this.props.setGulaDarah }
                            />
                            {/* <p className="text-xl mb-1">Gula Darah</p>
                            <div className="relative">
                                <input
                                    type="text"
                                    // value={this.props.gulaDarah} 
                                    // onChange={this.props.setGulaDarah}
                                    onFocus={() => this.setState({inputName: 'GulaDarah'})}
                                    value = { this.state.allInputs.GulaDarah }
                                    onChange={ (event) => {
                                        this.props.setGulaDarah(event.target.value)
                                        this.setState({
                                            allInputs: { ...this.state.allInputs, GulaDarah: event.target.value }
                                        })
                                    } }
                                    className="w-full text-2xl font-semibold pl-3 pr-10 py-2 bg-gray-200 placeholder-gray-400 outline-none border-4 border-gray-200 focus:border-brand-orange rounded-lg"
                                    placeholder="100"
                                />
                                <p className="mx-3 text-xl text-gray-600 flex items-center absolute inset-y-0 right-0">mg/dL</p>
                            </div> */}
                        </div>
                        <div>
                            <CustomInput
                            data={ this.props.denyutJantung }
                            value={ this.props.denyutJantung }
                            label={"Denyut Nadi"}
                            unit={"BPM"}
                            onchange={ this.props.setDenyutJantung }
                            />
                            {/* <p className="text-xl mb-1">Denyut Nadi</p>
                            <div className="relative">
                                <input
                                    type="text"
                                    // value={this.props.denyutJantung} 
                                    // onChange={this.props.setDenyutJantung}
                                    onFocus={() => this.setState({inputName: 'DenyutJantung'})}
                                    value = { this.state.allInputs.DenyutJantung }
                                    onChange={ (event) => {
                                        this.props.setDenyutJantung(event.target.value)
                                        this.setState({
                                            allInputs: { ...this.state.allInputs, DenyutJantung: event.target.value }
                                        })
                                    } }
                                    className="w-full text-2xl font-semibold pl-3 pr-10 py-2 bg-gray-200 placeholder-gray-400 outline-none border-4 border-gray-200 focus:border-brand-orange rounded-lg"
                                    placeholder="60"
                                />
                                <p className="mx-3 text-xl text-gray-600 flex items-center absolute inset-y-0 right-0">BPM</p>
                            </div> */}
                        </div>
                        <div className="flex space-x-2">
                            <CustomInput
                                data={ this.props.tekananDarah }
                                value={ this.props.tekananDarah }
                                label={"Sistolik"}
                                unit={"mmHg"}
                                onchange={ this.props.setTekananDarah }
                            />
                            <CustomInput
                                data={ this.props.tekananDarah }
                                value={ this.props.tekananDarah }
                                label={"Diastolik"}
                                unit={"mmHg"}
                                onchange={ this.props.setTekananDarah }
                            />
                        </div>
                        <div>
                            <CustomInput
                            data={ this.props.respirationRate }
                            value={ this.props.respirationRate }
                            label={"Respiration Rate"}
                            unit={""}
                            onchange={ this.props.setRespirationRate }
                            />
                        </div>
                        <div>
                            <CustomInput
                            data={ this.props.spo }
                            value={ this.props.spo }
                            label={'SPO2'}
                            unit={"%"}
                            onchange={ this.props.setSpo }
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PatientDetail