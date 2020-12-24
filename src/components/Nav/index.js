import React, { Component } from "react";
import { Link } from 'react-router-dom';

class Nav extends Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: null
        }
    }

    powerOff () {
        this.props.disconnect()
    }

    showModal () {
        alert('alert alert !')
    }

    render () 
    {

        let {isConnected, nurseId} = this.props
        console.log(this.props)
        let info_navbar
        
        if(nurseId !== ''){
            info_navbar =
            <>
                <div>
                    <span className="text-sm font-light opacity-50">Perawat</span>
                    <p className="text-xl font-bold">{this.props.nurseId}</p>
                </div>
                <div>
                    <span className="text-sm font-light opacity-50">Ruangan</span>
                    <p className="text-xl font-bold">{this.props.ruangId.name}</p>
                </div>
                <div>
                    <span className="text-sm font-light opacity-50">ID Pasien</span>
                    <p className="text-xl font-bold">{this.props.patientId}</p>
                </div>
            </>
        }

        let button_off

        if(isConnected) {
            button_off = 
                <button onClick={this.props.setToggleModal} className="p-3 flex bg-red-600 items-center focus:outline-none text-xl">
                    <svg className="w-6 h-6 text-white mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M7 6a7.75 7.75 0 1 0 10 0" />
                    <line x1="12" y1="4" x2="12" y2="12" />
                    </svg>
                    <p className="text-white text-base">Power</p>
                </button>
                // <Link to='/'>
                // </Link>
        }
        
        return (
            <>
                <div className="flex items-center justify-between bg-brand-green">
                    <div className="flex px-3 space-x-8 leading-tight text-white">
                        <div className="h-12 text-base font-semibold">
                            {this.props.rumahSakit}
                            <p className="text-sm font-light opacity-75">
                                Jalan Dharmawangsa No.100, Surabaya
                            </p>
                        </div>
                        {info_navbar}
                    </div>
                    <div className="flex">
                        <Link to='/pengaturan' className="no-underline">
                            <button className="p-3 flex items-center text-xl focus:outline-none">
                                <svg className="w-6 h-6 text-white mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                <p className="text-white text-base">Settings</p>
                            </button>
                        </Link>
                        {button_off}
                    </div>
                </div>
            </>
        )
    }
}

export default Nav;
