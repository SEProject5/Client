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
import { useSelector } from "react-redux";
import {RestrictRoute} from './components/Common/RestrictRoute';

function App() {
  const users = useSelector(({users}) =>(users));

  const GoToMainPage = () => {
    alert("관리자만 접근 가능한 페이지입니다.");
    return <Redirect to="/" />;
  };

//   const Admin = lazy(() => import("./pages/Admin"));
// const MyPage = lazy(() => import("./pages/MyPage"));
// const Shop = lazy(() => import("./pages/Shop"));
// const Product = lazy(() => import("./pages/Product"));

  return (
    <Switch>
      <Suspense fallback={<div>Loading.....</div>}>
        <Layout>
          <Route exact path="/" component={Home}/>
          <Route path="/shop/category/:categoryName" component={Shop}/>
          <Route path="/product/:p_id" component={Product}/>
          <Route path="/myPage" component={MyPage}/>
          <Route path="/signup" component={SignUp}/>
          {/* <Route path="/admin" component={Admin}/> */}
          {users  && <RestrictRoute exact path="/admin" component={Admin} isAllow={users.user_type === 'admin'} Fallback={GoToMainPage} /> }

        </Layout>
      </Suspense>
    </Switch>
  );
}



// const ROLE = {
//   NONE: "NONE", // 권한 없음
//   USER: "USER",
//   ADMIN: "ADMIN",
//   // READ: "READ", // 읽기 권한
//   // WRITE: "WRITE", // 쓰기 권한
// }

// const myRole = {
//   usersPage: ROLE.NONE, // 사용자 관리 화면
//   productsPage: ROLE.USER, // 상품 관리 화면
//   adminPage: ROLE.ADMIN, // 광고 관리 화면
// };

export default App;
