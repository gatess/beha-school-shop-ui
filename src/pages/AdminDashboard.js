import React from "react";
import {Route, Switch} from "react-router-dom";
import Admin from "./Admin";

const AdminDashboard = ({match}) => (
    <div className="gx-main-content-wrapper">
  <Switch>

    <Route path={`/admin1`} component={Admin}/>
  </Switch></div>
);

export default AdminDashboard;
