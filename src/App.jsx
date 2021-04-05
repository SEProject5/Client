import React, {Component} from 'react';
import { BrowserRouter,Route, Link, Switch, Redirect } from "react-router-dom";
import Header from './components/Common/Header';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Footer from './components/Common/Footer';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/login' component={Login}/>
        <Route path='/signup' component={SignUp}/>   
        <Redirect from="*" to="/" />   
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
