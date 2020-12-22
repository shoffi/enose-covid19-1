import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "react-simple-keyboard/build/css/index.css";

import Nav from "./components/Nav";
import TopNav from "./components/Nav/Top";
import Home from "./components/Pages/Home";
import Menu from "./components/Pages/Menu";
import AmbilSample from "./components/Pages/AmbilSample";
import PatientDetail from "./components/Pages/PatientDetail";
import MainChart from "./components/Pages/MainChart";
import Welcome from "./components/Pages/Welcome";
import Pengaturan from "./components/Pages/Pengaturan";
import Modal from './components/Modal';
import RegisterPatient from './components/Pages/RegisterPatient'
import SymptomPatient from './components/Pages/SymptomPatient'

const { ipcRenderer } = window; 

class App extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            layoutName: "default",
            input: "",

            rumahSakit: "",
            nurseId: "",
            ruangId: "",
            patientId: "",
            covidStatus: "",
            waktuTes: "",

            suhuTubuh: "",
            asamUrat: "",
            kolestrol: "",
            saturasiOksigen: "",
            gulaDarah: "",
            denyutJantung: "",

            tekananDarah: "",
            respirationRate: "",
            spo: "",

            ctPcr: "",
            ddimer: "",
            hemoglobin: "",
            leukosit: "",
            trombosit: "",
            LED: "",
            bloodGas: "",

            toggleModal: false,

            hasilSwab: "",
            pcrTool:"",
            bloodAnalysis:"",

            isConnected: false,
            proses1 : null,
            proses2 : null,
            proses3 : null,
            renderMainChart: true,
            ruangan: [
              {id: 1, name: 'ICU'},
              {id: 2, name: 'Rawat Inap'},
              {id: 3, name: 'ERIKA'},
          ],
        };

        ipcRenderer.send('getPengaturan')
        ipcRenderer.on('getPengaturanResponse', (event, response) => {
            this.setState({
                proses1 : response[0],
                proses2 : response[1],
                proses3 : response[2],
            })
        })

        this.setNurseId = this.setNurseId.bind(this);
        this.setRuangId = this.setRuangId.bind(this);
        this.setPatientId = this.setPatientId.bind(this);
        this.setWaktuTes = this.setWaktuTes.bind(this)
        this.setHasilSwab = this.setHasilSwab.bind(this)
        this.setPcrTool = this.setPcrTool.bind(this)
        this.setBloodAnalysis = this.setBloodAnalysis.bind(this)
        this.setCovidStatus = this.setCovidStatus.bind(this)

        this.setSuhuTubuh = this.setSuhuTubuh.bind(this);
        this.setAsamUrat = this.setAsamUrat.bind(this);
        this.setKolestrol = this.setKolestrol.bind(this);
        this.setSaturasiOksigen = this.setSaturasiOksigen.bind(this);
        this.setGulaDarah = this.setGulaDarah.bind(this);
        this.setDenyutJantung = this.setDenyutJantung.bind(this);
        this.setTekananDarah = this.setTekananDarah.bind(this);
        this.setRespirationRate = this.setRespirationRate.bind(this);
        this.setSpo = this.setSpo.bind(this);
        this.setCtPcr = this.setCtPcr.bind(this);
        this.setDdimer = this.setDdimer.bind(this);
        this.setHemoglobin = this.setHemoglobin.bind(this);
        this.setLeukosit = this.setLeukosit.bind(this);
        this.setTrombosit = this.setTrombosit.bind(this);
        this.setLED = this.setLED.bind(this);
        this.setBloodGas = this.setBloodGas.bind(this);

        this.connect = this.connect.bind(this);
        this.disconnect = this.disconnect.bind(this);
        this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
        this.updateTimer = this.updateTimer.bind(this);

        this.setToggleModal = this.setToggleModal.bind(this);
    }

    componentDidMount () {
      ipcRenderer.send('mounted');
      ipcRenderer.on('mountedResponse', (event, rumahSakit) => {
        this.setState({ 
          rumahSakit: rumahSakit
        })
      });

      ipcRenderer.send('coba', 'Satu dua tiga empat');
      ipcRenderer.on('cobaResponse', (event, response) => {
        // console.log(response)
      });
    }

    connect() {
      let connectStatus = true
      
      ipcRenderer.send('connect');
      
      this.setState({ 
        isConnected: true
      })
      
      return connectStatus;
    }

    disconnect () {
      // ipcRenderer.send('disconnect');
      this.setState({
        isConnected: false,
      });
      this.setToggleModal();
    }

    setNurseId(nurseId) {
      this.setState({
          nurseId: nurseId,
      });
    }

    setRuangId(value) {
      this.setState({
          ruangId: value,
      });
    }

    setPatientId(value) {
      this.setState({
          patientId: value,
      });
    }

    setWaktuTes(value) {
      console.log('setWaktuTes =' + value)
      this.setState({
          waktuTes: value,
      });
    }

    setHasilSwab(value) {
      this.setState({
          covidStatus: value,
      });
    }

    setPcrTool(value) {
      this.setState({
          pcrTool: value,
      });
    }

    setBloodAnalysis(value) {
      this.setState({
          bloodAnalysis: value,
      });
    }

    setSuhuTubuh (value) {
      this.setState({
          suhuTubuh: value,
      })
    }

    setAsamUrat (value) {
      this.setState({
          asamUrat: value,
      })
    }

    setKolestrol (value) {
      this.setState({
          kolestrol: value,
      })
    }

    setSaturasiOksigen (value) {
      this.setState({
          saturasiOksigen: value,
      })
    }

    setGulaDarah (value) {
      this.setState({
          gulaDarah: value,
      })
      console.log(value)
    }

    setDenyutJantung (value) {
      this.setState({
          denyutJantung: value,
      })
    }
    
    setTekananDarah (value) {
      this.setState({
          tekananDarah: value,
      })
      console.log('tekananDarah' + value)
    }

    setRespirationRate (value) {
      this.setState({
          respirationRate: value,
      })
    }

    setCtPcr (value) {
      this.setState({
        ctPcr: value,
      })
    }

    setDdimer (value) {
      this.setState({
        ddimer: value,
      })
    }

    setHemoglobin (value) {
      this.setState({
        hemoglobin: value,
      })
    }

    setLeukosit (value) {
      this.setState({
        leukosit: value,
      })
    }

    setTrombosit (value) {
      this.setState({
        trombosit: value,
      })
    }

    setLED (value) {
      this.setState({
        LED: value,
      })
    }

    setBloodGas (value) {
      this.setState({
        bloodGas: value,
      })
    }

    setCovidStatus (value) {
      this.setState({
        covidStatus: value,
      })
    }

    setSpo (value) {
      this.setState({
          spo: value,
      })
    }

    setToggleModal() {
      this.setState({
        toggleModal : !this.state.toggleModal
      })
    }

    forceUpdateHandler(){
      ipcRenderer.send('getPengaturan')
      this.forceUpdate();
    };

    updateTimer(){
      ipcRenderer.send('getPengaturan')
      ipcRenderer.once('getPengaturanResponse', (event, response) => {
          this.setState({
              proses1 : response[0],
              proses2 : response[1],
              proses3 : response[2],
          })
      })
    }

    render() {

      return (
        <div className="relative">

          <div className="fixed w-full bg-white z-20 border-b px-4 py-2">
            <TopNav></TopNav>
          </div>

          <Router>
            <div className="container mx-auto min-h-screen flex z-0 py-20">
            
              <Route path='/' exact>
                  <Welcome
                    forceUpdateHandler = {this.forceUpdateHandler}
                    connect={this.connect}
                  />
              </Route>
              
              <Route path='/connect' exact>
                  <Home
                      nurseId={this.state.nurseId}
                      ruangId={this.state.ruangId}
                      setNurseId={this.setNurseId}
                      setRuangId={this.setRuangId}
                      ruangan={this.state.ruangan}
                  />
              </Route>

              <Route path='/menu' exact>
                  <Menu/>
              </Route>

              <Route path='/register-patient' exact>
                <RegisterPatient
                  patientId={this.state.patientId}
                  setPatientId={this.setPatientId}
                  waktuTes={this.state.waktuTes}
                  setWaktuTes={this.setWaktuTes}
                />
              </Route>

              <Route path='/symptom-patient' exact>
                <SymptomPatient
                  ctPcr={this.state.ctPcr}
                  setCtPcr={this.setCtPcr}
                  
                  ddimer={this.state.ddimer}
                  setDdimer={this.setDdimer}
                  
                  hemoglobin= {this.state.hemoglobin}
                  setHemoglobin = {this.setHemoglobin}

                  leukosit= {this.state.leukosit}
                  setLeukosit = {this.setLeukosit}

                  trombosit= {this.state.trombosit}
                  setTrombosit = {this.setTrombosit}

                  LED= {this.state.LED}
                  setLED = {this.setLED}

                  bloodGas= {this.state.bloodGas}
                  setBloodGas = {this.setBloodGas}
                  
                  covidStatus = {this.state.covidStatus}
                  setCovidStatus = {this.setCovidStatus} 

                  pcrTool = {this.state.pcrTool}
                  setPcrTool = {this.setPcrTool}

                  bloodAnalysis = {this.state.bloodAnalysis}
                  setBloodAnalysis = {this.setBloodAnalysis}
                />
              </Route>

              <Route path='/patient-detail' exact>
                  <PatientDetail
                    setPatientId = {this.setPatientId}
                    suhuTubuh = {this.state.suhuTubuh}
                    setSuhuTubuh = {this.setSuhuTubuh}
                    asamUrat = {this.state.asamUrat}
                    setAsamUrat = {this.setAsamUrat}
                    kolestrol = {this.state.kolestrol}
                    setKolestrol = {this.setKolestrol}
                    saturasiOksigen = {this.state.saturasiOksigen}
                    setSaturasiOksigen = {this.setSaturasiOksigen}
                    gulaDarah = {this.state.gulaDarah}
                    setGulaDarah = {this.setGulaDarah}
                    denyutJantung = {this.state.asamUrat}
                    setDenyutJantung = {this.setDenyutJantung}
                    tekananDarah = {this.state.tekananDarah}
                    setTekananDarah = { this.setTekananDarah }
                    respirationRate = {this.state.respirationRate}
                    setRespirationRate = { this.setRespirationRate }
                    spo = {this.state.spo}
                    setSpo = { this.setSpo }
                  />
              </Route>
              
              <Route path='/ambil-sample' exact>
                  <AmbilSample
                    nurseId={this.state.nurseId}
                    ruangId={this.state.ruangId}
                    patientId={this.state.patientId}
                    covidStatus={this.state.covidStatus}
                    suhuTubuh= {this.state.suhuTubuh}
                    asamUrat= {this.state.asamUrat}
                    kolestrol= {this.state.kolestrol}
                    saturasiOksigen= {this.state.saturasiOksigen}
                    gulaDarah= {this.state.gulaDarah}
                    denyutJantung= {this.state.denyutJantung}

                    tekananDarah= {this.state.tekananDarah}
                    respirationRate= {this.state.respirationRate}
                    spo= {this.state.spo}

                    ctPcr= {this.state.ctPcr}
                    ddimer= {this.state.ddimer}
                    hemoglobin= {this.state.hemoglobin}
                    leukosit= {this.state.leukosit}
                    trombosit= {this.state.trombosit}
                    LED= {this.state.LED}
                    bloodGas= {this.state.bloodGas}
                  />
              </Route>

              <Route path='/history' exact>
                  <Menu/>
              </Route>

              <Route path='/data-baru' exact>
                  <Menu/>
              </Route>
              {/* <Route path="/main-chart" exact>
                  <MainChart 
                    {...props}
                    proses1={this.state.proses1}
                    proses2={this.state.proses2}
                    proses3={this.state.proses3}
                  />
              </Route> */}
              <Route 
                path="/main-chart" 
                render={(props) => (
                  <MainChart 
                    {...props}
                    proses1={this.state.proses1}
                    proses2={this.state.proses2}
                    proses3={this.state.proses3}

                    tekananDarah= {this.state.tekananDarah}
                    respirationRate= {this.state.respirationRate}
                    spo= {this.state.spo}

                    ctPcr= {this.state.ctPcr}
                    ddimer= {this.state.ddimer}
                    hemoglobin= {this.state.hemoglobin}
                    leukosit= {this.state.leukosit}
                    trombosit= {this.state.trombosit}
                    LED= {this.state.LED}
                    bloodGas= {this.state.bloodGas}
                  />
                )}
              />

              <Route path='/pengaturan' exact>
                  <Pengaturan 
                    proses1={this.state.proses1}
                    proses2={this.state.proses2}
                    proses3={this.state.proses3}
                    forceUpdateHandler = {this.forceUpdateHandler}
                  />
              </Route>
          </div>
          
          <div className="absolute top-0 w-full z-10">
              {this.state.toggleModal && (
                <Modal
                  setToggleModal = {this.setToggleModal}
                  disconnect = {this.disconnect}
                ></Modal>
              )}
          </div>

          <div className="fixed w-full bottom-0">
            <Nav
                  isConnected={this.state.isConnected}
                  nurseId={this.state.nurseId}
                  patientId={this.state.patientId}
                  ruangId={this.state.ruangId}
                  rumahSakit={this.state.rumahSakit}
                  connect={this.connect}
                  disconnect={this.disconnect}
                  setToggleModal = {this.setToggleModal}
              />
          </div>

          </Router>
          
        </div>
      );
    }
}

export default App;
