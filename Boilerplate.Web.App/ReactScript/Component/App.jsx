// ./src/common/main.component.jsx
import React, { Component } from 'react';


import { NavLink, Switch, Route, HashRouter } from 'react-router-dom';
import ReactDOM from "react-dom";
import Navbar from './Navbar';
import Routing from './Routing';


class App extends Component {
    render() {

        return (

            <div>
                <div className="header">
                    <Navbar />
                </div>
                <div className="content">
                    <Routing />
                </div>
            </div>


        );

    }

}

export default App;


