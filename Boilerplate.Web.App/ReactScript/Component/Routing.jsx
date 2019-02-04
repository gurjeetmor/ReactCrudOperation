import { Switch, Route } from 'react-router-dom';
import React, { Component } from 'react';
import Home from './Home';
import Product from './Product/Product';
import Customer from './Customer/Customer';
import Store from './Store/Store';
import Sales from './Sales/Sales';

const Routing = () =>
    (
        <Switch>
            <Route path="/Home" component={Home} />
            <Route path="/Customer" component={Customer} />
            <Route path="/product" component={Product} />
            <Route path="/Store" component={Store} />
            <Route path="/Sales" component={Sales} />


        </Switch>
    )

export default Routing;
