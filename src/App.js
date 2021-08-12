import React from "react";
import { Layout } from "antd";
//import InsideHeader from "./containers/Topbar/InsideHeader/index";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import Main from "./pages/Main";
import CustInfo from "./pages/CustomerInformation";
import PaymentInfo from "./pages/PaymentInformation";
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Address from './pages/Address';
import "assets/vendors/style";
import "styles/wieldy.less";
import Navbar from './components/navbar/Navbar';
import TeacherLogin from "./pages/TeacherLogin";

const { Header, Content, Footer } = Layout;
const App = () => {

  return (
    <Router>
      <div>
        {/*
        A <Switch> looks through all its children <Route>
        elements and renders the first one whose path
        matches the current URL. Use a <Switch> any time
        you have multiple routes, but you want only one
        of them to render at a time
      */}
        <Layout className="gx-app-layout">
        <Navbar/>
          <Content className="gx-layout-content gx-container-wrap">
            <Switch>
              <Route exact path="/">
                <Main />
              </Route>
            
              <Route path="/customerinformation">
                <CustInfo />
              </Route>
              <Route path="/paymentinformation">
                <PaymentInfo />
              </Route>
              <Route path="/signin" >
                <SignIn />
              </Route>              
              <Route path="/signup">
                <SignUp />
              </Route>
              <Route path="/address">
                <Address />
              </Route>
            </Switch>
            <Footer>
              
                dsds
              
            </Footer>
          </Content>
        </Layout>
      </div>
    </Router>);
}
export default App;