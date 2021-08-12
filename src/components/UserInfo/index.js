import React from "react";
import {Avatar, Popover} from "antd";
import { useHistory } from "react-router-dom";

const UserInfo = () => {


  const history = useHistory();
  const logOut  = () => {
    debugger;
    localStorage.removeItem('userId');
    //localStorage.setItem('userId',JSON.stringify(null));
    history.push({
      pathname: '/app'      
    });
  }

  const userMenuOptions = (
    <ul className="gx-user-popover">
      <li><a href="/app/myaccount"  style={{color: "#545454"}}>Hesabım</a></li>
      <li><a href="/app" onClick={logOut}  style={{color: "#545454"}}>Çıkış Yap</a></li>
    </ul>
  );

  return (
    <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight" content={userMenuOptions}
             trigger="click">
      <Avatar src='https://via.placeholder.com/150x150'
              className="gx-avatar gx-pointer" alt=""/>
    </Popover>
  )
};


export default UserInfo;
