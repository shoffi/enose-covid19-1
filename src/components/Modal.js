import React, { Component } from "react";
import { Link } from 'react-router-dom';

class Modal extends Component {

    render () {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900 bg-opacity-75">
              <div className="bg-white w-2/3 md:w-1/2 rounded-lg p-3">
                <div className="mb-6">
                  <div className="my-3">
                    <svg className="w-16 h-16 mx-auto text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                  </div>
                  <div className="text-center leading-snug">
                    <p className="text-xl font-semibold text-gray-800">Apakah yakin ingin mematikan alat?</p>
                    <span className="text-gray-600">Proses yang berlangsung akan otomatis mati.</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 space-x-3">
                    <button
                    onClick={this.props.setToggleModal}
                    className="w-full bg-gray-300 text-gray-700 rounded p-2">Kembali</button>

                    <Link to='/'>
                    <button
                    onClick={this.props.disconnect}
                    className="w-full bg-red-600 text-white rounded p-2">Iya, matikan</button>
                    </Link>
                </div>
              </div>
            </div>
        )
    }
}

export default Modal;