import React, { Component } from "react";

class TitleBar extends Component {
    render () {
        return (
            <div className="relative flex items-center justify-between">
                <div className="z-10">
                    {this.props.back && (
                        <button
                        onClick={this.props.setBack}
                        className="flex items-center text-lg w-full bg-gray-500 text-white font-semibold focus:outline-none rounded-lg pr-3 pl-1 py-1">
                            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                            Kembali
                        </button>
                    )}
                </div>
                <div className="absolute w-full">
                    <h2 className="text-2xl text-center font-bold">{this.props.title}</h2>
                </div>
                <div className="z-10">
                    {this.props.next && (
                        <button
                        onClick={this.props.setNext}
                        className="flex justify-end items-center text-lg w-full text-white bg-brand-green font-semibold focus:outline-none rounded-lg pl-3 pr-1 py-1">
                            {this.props.setNextName}
                            <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                        </button>
                    )}
                </div>
            </div>
        )
    }
}

export default TitleBar;