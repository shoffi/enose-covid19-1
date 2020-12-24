import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import TitleBar from '../Nav/TitleBar';
import FlagID from '../../images/flag-id.png';
import FlagEN from '../../images/flag-en.jpg';

const { ipcRenderer } = window;

class Pengaturan extends Component {
    constructor (props) {
        super (props)

        this.state = {
            proses1 : this.props.proses1,
            proses2 : this.props.proses2,
            proses3 : this.props.proses3,
            redirect: null
        }

        ipcRenderer.send('getPengaturan')
        ipcRenderer.on('getPengaturanResponse', (event, response) => {
            this.setState({
                proses1 : response[0],
                proses2 : response[1],
                proses3 : response[2],
            })
        })

        this.getPengaturan = this.getPengaturan.bind(this);
        this.updatePengaturan = this.updatePengaturan.bind(this);

        this.changeProses1 = this.changeProses1.bind(this);
        this.changeProses2 = this.changeProses2.bind(this);
        this.changeProses3 = this.changeProses3.bind(this);
    }

    getPengaturan () {
        ipcRenderer.send('getPengaturan')
        ipcRenderer.on('getPengaturanResponse', (event, response) => {
            this.setState({
                proses1 : response[0],
                proses2 : response[1],
                proses3 : response[2],
            })
        })
    }

    changeProses1 (event) {
        this.setState({
            proses1: event.target.value
        })
    }

    changeProses2 (event) {
        this.setState({
            proses2: event.target.value
        })
    }

    changeProses3 (event) {
        this.setState({
            proses3: event.target.value
        })
    }

    updatePengaturan () {
        ipcRenderer.send('updatePengaturan', this.state)
        alert('timer updated')
    }

    back() {
        this.props.forceUpdateHandler();
        this.setState({
            redirect: '/'
        });
    }

    render () {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        return (
            <div>
                <TitleBar
                    title={'Pengaturan'}
                    back={true}
                    next={true}
                    setBack={() => this.back()}
                    setNext={() => this.updatePengaturan()}
                    setNextName={'Simpan'}
                ></TitleBar>
                <div className="pt-12 pb-8">
                    <div className="flex">
                        <div className="w-2/5 pr-4 leading-snug">
                            <h2 className="mt-1 text-2xl font-semibold mb-2">Waktu proses</h2>
                            <p className="text-gray-600">Waktu didapat dari total Proses 1, Proses 2, dan Proses 3.</p>
                        </div>
                        <div className="w-3/5">
                            <div className="flex space-x-4">
                                <div className="w-1/3">
                                    <p className="text-lg font-semibold mb-1 text-brand-green">Proses 1</p>
                                    <div className="relative">
                                        <input
                                        type="text"
                                        value={this.state.proses1} 
                                        onChange={this.changeProses1}
                                        className="w-full text-xl font-semibold pl-3 pr-12 py-2 bg-gray-200 placeholder-gray-400 outline-none border-4 border-gray-200 focus:border-brand-orange rounded-lg"
                                        placeholder="0"
                                        />
                                        <p className="mx-3 text-lg text-gray-500 flex items-center absolute inset-y-0 right-0">detik</p>
                                    </div>
                                </div>
                                <div className="w-1/3">
                                    <p className="text-lg font-semibold mb-1 text-brand-green">Proses 2</p>
                                    <div className="relative">
                                        <input
                                        type="text"
                                        value={this.state.proses2} 
                                        onChange={this.changeProses2}
                                        className="w-full text-xl font-semibold pl-3 pr-12 py-2 bg-gray-200 placeholder-gray-400 outline-none border-4 border-gray-200 focus:border-brand-orange rounded-lg"
                                        placeholder="0"
                                        />
                                        <p className="mx-3 text-lg text-gray-500 flex items-center absolute inset-y-0 right-0">detik</p>
                                    </div>
                                </div>
                                <div className="w-1/3">
                                    <p className="text-lg font-semibold mb-1 text-brand-green">Proses 3</p>
                                    <div className="relative">
                                        <input
                                        type="text"
                                        value={this.state.proses3} 
                                        onChange={this.changeProses3}
                                        className="w-full text-xl font-semibold pl-3 pr-12 py-2 bg-gray-200 placeholder-gray-400 outline-none border-4 border-gray-200 focus:border-brand-orange rounded-lg"
                                        placeholder="0"
                                        />
                                        <p className="mx-3 text-lg text-gray-500 flex items-center absolute inset-y-0 right-0">detik</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr className="my-6"></hr>

                    <div className="flex">
                        <div className="w-2/5 pr-4 leading-snug">
                            <h2 className="mt-1 text-2xl font-semibold mb-2">Pilih Bahasa</h2>
                            <p className="text-gray-600">Bah Indonesia telah dipilih</p>
                        </div>
                        <div className="w-3/5 flex space-x-4">
                            <div className="w-1/3">
                                <button className="w-full text-lg p-3 leading-none border-2 border-brand-green bg-brand-green text-white font-semibold rounded-lg">
                                    <div className="w-8 h-6 mx-auto mb-2 bg-gray-300 rounded overflow-hidden">
                                        <img
                                        src={FlagID}
                                        className="object-cover h-full"
                                        alt="Indonesia" />
                                    </div>
                                    Indonesia</button>
                            </div>
                            <div className="w-1/3">
                                <button className="w-full text-lg p-3 leading-none border-2 text-brand-green font-semibold rounded-md">
                                    <div className="w-8 h-6 mx-auto mb-2 bg-gray-300 rounded overflow-hidden">
                                        <img
                                        src={FlagEN}
                                        className="object-cover h-full"
                                        alt="English" />
                                    </div>
                                    English</button>
                            </div>
                        </div>
                    </div>
                    
                    {/* <form onSubmit={this.updatePengaturan}>
                        <div className='form-group row'>
                            <h2 className="col-md-2" >Proses 1</h2>
                            <input onChange={ this.changeProses1 } value={this.state.proses1} className="col-2 text-center form-control" />
                        </div>
                        <div className='form-group row'>
                            <h2 className="col-md-2" >Proses 2</h2>
                            <input onChange={ this.changeProses2 } value={this.state.proses2} className="col-2 text-center form-control"/>
                        </div>
                        <div className='form-group row'>
                            <h2 className="col-md-2" >Proses 3</h2>
                            <input onChange={ this.changeProses3 } value={this.state.proses3} className="col-2 text-center form-control"/>
                        </div>
                        
                        <button className="btn btn-primary" type='submit'> <h2>Simpan</h2> </button>
                    </form> */}
                </div>
            </div>
        );
    }
}

export default Pengaturan;