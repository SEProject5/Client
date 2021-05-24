import React, {Component} from 'react';
import { BrowserRouter,Route, Link, Switch, Redirect } from "react-router-dom";
import Layout from '../src/components/Common/Layout';
import Shop from './pages/Shop';
import Product from './pages/Product';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Admin from './pages/Admin';
import { useSelector } from 'react-redux';
import user from './modules/user';

function App() {
  // const users = useSelector(({users}) =>(users));
  // let currentRole;
  // if (users.user_type === 'admin') {
  //   currentRole = myRole.adminPage;
  // } else {
  //   currentRole = myRole.usersPage;
  // }

  return (
    <Switch>
      <Layout>
        <Route exact path='/' component={Home}/>
        <Route exact path='/shop/:category' component={Shop}/>
        <Route exact path='/product/:id' component={Product}/>
        <Route path='/admin' component={Admin}/>
        {/* {users && users.user_type === 'admin' && (<RouteIf
          path="/admin"
          exact
          component={Admin}
          role={currentRole}
        />)} */}
        <Route path='/signup' component={SignUp}/>   
      </Layout>
      {/* <Redirect from="*" to="/" />    */}
    </Switch>
  );
}

const RouteIf = ({ role, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        // 권한 체크
        if (role === ROLE.NONE) {
          return <Home />
        }

        if (Component) {
          // role을 컴포넌트에 전달
          return <Component {...props} role={role} />
        }

        return null
      }}
    />
  )
}
const ROLE = {
  NONE: "NONE", // 권한 없음
  USER: "USER",
  ADMIN: "ADMIN",
  // READ: "READ", // 읽기 권한
  // WRITE: "WRITE", // 쓰기 권한
}

const myRole = {
  usersPage: ROLE.NONE, // 사용자 관리 화면
  productsPage: ROLE.USER, // 상품 관리 화면
  adminPage: ROLE.ADMIN, // 광고 관리 화면
};

export default App;
