import React, { Component } from "react";
import Clock from '../Clock';

import logoTop from'../../images/logoTop.png';

class TopBar extends Component {
    render () {
        return (
            <div className="p-4 flex items-center justify-between">
                <img src={logoTop} className="h-10" alt="Logo I-Nose"/>
                <div className="text-2xl font-semibold">
                    <Clock></Clock>
                </div>
            </div>
        )
    }
}

export default TopBar;