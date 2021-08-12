import React from "react";
import { Layout } from "antd";
import {
 /* BrowserRouter as Router,*/
  Switch,
  Route
} from "react-router-dom";
import Main from "../../pages/Main";

import Sidebar2 from "../../components/sidebar/index";
import CustInfo from "../../pages/CustomerInformation";
import PaymentInfo from "../../pages/PaymentInformation";
import SignIn from '../../pages/SignIn';
import SignUp from '../../pages/SignUp';
import Address from '../../pages/Address';
import MyAccount from '../../pages/MyAccount';
import Order from '../../pages/Order';
import OrderDetail from '../../pages/OrderDetail';
import InsideHeader from "../Topbar/InsideHeader/index";
import asyncComponent from "../../util/asyncComponent";

const {  Content, Footer } = Layout;
const CustomerRoutes = (props) => {

    return(
        <Layout className="gx-app-layout">
        {/*getSidebar(width)*/}
        <Layout>
          <InsideHeader />
          <Content className="gx-layout-content gx-container-wrap">
           
            
            <Route  path="/sidebar">
                <Sidebar2 />
              </Route>
              <Route exact path={props.match.path} component={Main}/>
              <Route path={`${props.match.path}/myaccount`} component={MyAccount} />
              <Route path={`${props.match.path}/customerinformation`} component={CustInfo} />
              <Route path={`${props.match.path}/paymentinformation`} component={PaymentInfo} />
              <Route path={`${props.match.path}/signin`} component={SignIn} />
              <Route path={`${props.match.path}/signup`} component={SignUp} />
              <Route path={`${props.match.path}/address`} component={Address} />
              <Route path={`${props.match.path}/forgotpassword`} component={asyncComponent(() => import('../../pages/ForgotPassword'))}/>
              <Route path={`${props.match.path}/algolia`} component={asyncComponent(() => import('../../components/algolia'))}/>
            
            
            <Footer>
              <div className="gx-layout-footer-content" style={{textAlign:"center"}}>
              <span>
        2020 © <a href="https://www.behasss.com/"><img style={{width:"11%"}} src="http://behamagaza.com/images/behasss_logo_renkli.png"></img></a> </span>
              </div>
            </Footer>
          </Content>
        </Layout>

      </Layout>


    );
}
export default CustomerRoutes;