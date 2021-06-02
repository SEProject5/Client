import React, {Component} from "react";
import { lazy, Suspense } from "react";
import { BrowserRouter,Route, Link, Switch, Redirect } from "react-router-dom";
import Layout from "../src/components/Common/Layout";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Admin from "./pages/Admin";
import MyPage from "./pages/MyPage";
import Payment from "./pages/Payment";
import { useSelector } from "react-redux";
import {RestrictRoute} from './components/Common/RestrictRoute';

function App() {
  const user = useSelector(({user}) =>(user.user));


  return (
    <BrowserRouter>
      <Switch>
        <Suspense fallback={<div>Loading.....</div>}>
          <Layout>
            <Route exact path="/" component={Home}/>
            <Route path="/shop/category/:categoryName" component={Shop}/>
            <Route path="/product/:p_id" component={Product}/>
            <Route path="/myPage" component={MyPage}/>
            <Route path="/Payment" component={Payment}/>
            <Route path="/signup" component={SignUp}/>
            {user && user.user_type === 'admin' && <Route exact path="/admin" component={Admin}/>}
          </Layout>
        </Suspense>
      </Switch>
    </BrowserRouter>
  );
}



export default App;
