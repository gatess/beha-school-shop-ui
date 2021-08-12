import React, {useEffect} from "react";
import { Layout } from "antd";
import {
    /* BrowserRouter as Router,*/
    Switch,
    Route
} from "react-router-dom";
import Sidebar from "../../components/sidebar/index";
import AdminLogin from '../../pages/AdminLogin';
import Admin from '../../pages/Admin';
import Customer from '../../pages/Customer';
import Order from '../../pages/Order';
import OrderDetail from '../../pages/OrderDetail';
import CustomerDetail from '../../pages/CustomerDetail';

const { Content, Footer } = Layout;
const AdminRoutes = (props) => {
    let adminResult = JSON.parse(localStorage.getItem('adminResult')); 
    let adminId = adminResult ? adminResult.adminId : 0;
   
    console.log(adminId);
    return (
        <Layout className="gx-app-layout">
            {/*getSidebar(width)*/}
            <Layout>
            {adminId!=0 ?  (<Sidebar menuType="admin" />) :  []}

                <Content className="gx-layout-content gx-container-wrap">
                    <Route exact path={props.match.path} component={AdminLogin}/>
                    <Route path={`${props.match.path}/dashboard`} component={Admin} />
                    <Route path={`${props.match.path}/orderlist`} component={Order} />
                    <Route path={`${props.match.path}/customerlist`} component={Customer} />
                    <Route path={`${props.match.path}/order-detail`} component={OrderDetail} />
                    <Route path={`${props.match.path}/customer-detail`} component={CustomerDetail} />
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
export default AdminRoutes;