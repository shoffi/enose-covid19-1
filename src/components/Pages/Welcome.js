import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import logo from '../../images/logo1.jpg';

class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: null
        }
    }

    handleMasuk() { 
        // this.props.forceUpdateHandler()
        if(this.props.connect()){
            this.setState({redirect: '/connect'})
        }
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        return (
            <div className="flex items-center mx-auto">
                <div className="flex mx-auto">
                    <div className="w-64">
                        <img src={logo} className="" alt="Logo" />
                    </div>
                    <div>
                        <div className="text-4xl leading-tight mb-8">
                            <h2 className="font-light text-gray-600">Welcome to</h2>
                            <h2 className="font-bold">Electronic Nose ITS</h2>
                        </div>
                        <button
                        onClick={()=>this.handleMasuk()}
                        className="flex items-center text-white bg-brand-orange justify-center w-full rounded-md text-lg font-semibold py-2 focus:outline-none">
                            <svg className="w-8 h-8 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M7 6a7.75 7.75 0 1 0 10 0" />
                                <line x1="12" y1="4" x2="12" y2="12" />
                            </svg>
                            Power on
                        </button>
                    </div>

                </div>
            </div>
        );
    }
}

export default Welcome;
