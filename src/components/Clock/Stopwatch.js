import React, { Component } from "react";
const { ipcRenderer } = window;

class Stopwatch extends Component {
    constructor (props) {
        super(props);

        this.state = {
            runningTime: 0,
            status: true
        }

    }

    componentDidMount = () => {
        const startTime = Date.now() - this.state.runningTime;
        const totalTime = this.props.proses1 + this.props.proses2 + this.props.proses3

        if(this.state.status){
            this.timer = setInterval( () => {
                if(this.state.runningTime < totalTime){
                    
                    if(this.state.runningTime === this.props.proses1) {
                        ipcRenderer.send('pompaOff')
                    }

                    if(this.state.runningTime === this.props.proses1 + this.props.proses2) {
                        ipcRenderer.send('pompaOn')
                    }

                    this.setState({ runningTime: parseInt((Date.now() - startTime)/1000) });
                    this.props.setProgress( parseInt((this.state.runningTime/totalTime)*100) )
                }
            }, 1000);
        }
    };
    
    componentWillUnmount() {
        clearInterval(this.timer);
    }
    
    render () {
        return (
            <p className="text-gray-500">
                {this.state.runningTime} s
            </p>
        );
    }
}

export default Stopwatch;