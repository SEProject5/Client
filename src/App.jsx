import React, {Component} from 'react';
import { BrowserRouter,Route, Link, Switch, Redirect } from "react-router-dom";
import styled from 'styled-components';
import Layout from '../src/components/Common/Layout';
import Shop from './pages/Shop';
import Product from './pages/Product';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Admin from './pages/Admin';

function App() {
  return (
    <BrowserRouter>
        <Switch>
``        <Route path='/admin' component={Admin}/>
          <Layout>
            <Route exact path='/' component={Home}/>
            <Route exact path='/shop/:category' component={Shop}/>
            <Route exact path='/product/:id' component={Product}/>
            <Route path='/signup' component={SignUp}/>   
          </Layout>
          {/* <Redirect from="*" to="/" />    */}
        </Switch>
    </BrowserRouter>
  );
}

export default App;
