import React, { Component } from "react";
import { Link, Switch, Route, HashRouter } from 'react-router-dom';
import Home from './Home';
import Product from './Product/Product';
import Customer from './Customer/Customer';
import Store from './Store/Store';
import Sales from './Sales/Sales';
//import Sample from './Sample';


class Navbar extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            
                   <div>
                    <ul className="header">
                        <li><Link to="/Home">React</Link></li>
                        <li><Link to="/Product">Product</Link></li>
                        <li><Link to="/Customer">Customer</Link></li>
                        <li><Link to="/Store">Store</Link></li>
                    <li><Link to="/Sales">Sales</Link></li>
                    
                        
                    </ul>
                    
                </div>
                
           
                
           

        );
    }
}

export default Navbar;

//return (
//    <HashRouter>

//        <div>
//            <ul className="header">
//                <li><NavLink to="/">React</NavLink></li>
//                <li><NavLink to="/Product">Product</NavLink></li>
//                <li><NavLink to="/Customer">Customer</NavLink></li>
//                <li><NavLink to="/Store">Store</NavLink></li>
//                <li><NavLink to="/Sales">Sales</NavLink></li>

//            </ul>
//            <div className="content">
//                <Route exact path="/" component={Home} />
//                <Route path="/Product" component={Product} />
//                <Route path="/Customer" component={Customer} />
//                <Route path="/Store" component={Store} />
//                <Route path="/Sales" component={Sales} />

//            </div>
//        </div>

//    </HashRouter>



//);