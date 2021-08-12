import React from "react";
import { Layout } from "antd";
import InsideHeader from "../Topbar/InsideHeader/index";
import asyncComponent from "../../util/asyncComponent";
import {
 /* BrowserRouter as Router,*/
  Switch,
  Route
} from "react-router-dom";

import "../../assets/vendors/style";
import "../../styles/wieldy.less";
import CustomerRoutes from './CustomerRoutes';
import TeacherRoutes from './TeacherRoutes';
import SchoolAdminRoutes from './SchoolAdminRoutes';
import AdminRoutes from './AdminRoutes';
import Home from '../../pages/landing/index';


//import Navbar from './components/navbar/Navbar';

const {  Content, Footer } = Layout;
const App = () => {

  //const width = useSelector(({ settings }) => settings.width);

 /* const getSidebar = (width) => {
    if (width < TAB_SIZE) {
      return <Sidebar />;
    } else {
      return null;
    }

  };*/

  return (

    <div>
      {/*
        A <Switch> looks through all its children <Route>
        elements and renders the first one whose path
        matches the current URL. Use a <Switch> any time
        you have multiple routes, but you want only one
        of them to render at a time
      */}
      <Switch>
      <Route exact path="/" component={Home}/>
      <Route path="/app" component={CustomerRoutes} />
      <Route path="/teacher" component={TeacherRoutes}/>
      <Route path="/schooladmin" component={SchoolAdminRoutes}/>
      <Route path="/admin" component={AdminRoutes}/>
      </Switch>
    </div>
  );
}
export default App;