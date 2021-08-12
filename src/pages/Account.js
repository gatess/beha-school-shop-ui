import React, {useState} from "react";
import IntlMessages from "util/IntlMessages";
import {Drawer ,Card, message, Row, Col} from "antd";
import CustomScrollbars from "util/CustomScrollbars";
import AccountList from '../components/account/AccountList';
import Sider from "../components/myaccount/Sider";

const Account = (props) => {
    const [drawerState , setDrawerState] = useState(false);
    const [showMessage , setShowMessage] = useState(true);
    const [alertMessage , setAlertMessage] = useState(true);

    const onToggleDrawer = () =>{
        setDrawerState(true);
    }
    const handleRequestClose = () =>{
        setShowMessage(false);
    }
    
      
return (
    <Row style={{height:'100%'}} justify="center">
    <Col xs={24} md={16}>
        <Card style={{padding:'0px'}}>
    <div className="gx-main-content">
    <div className="gx-app-module">

      <div className="gx-d-block gx-d-lg-none">
        <Drawer
          placement="left"
          closable={false}
          visible={drawerState}
          onClose={onToggleDrawer}>
         
        </Drawer>
      </div>
      <div className="gx-module-sidenav gx-d-none gx-d-lg-flex">
<div className="gx-module-side">
      <div className="gx-module-side-header">
        <div className="gx-module-logo">
          <i className="icon icon-contacts gx-mr-4"/>
          <span><IntlMessages id="chat.contacts"/></span>
        </div>
      </div>

      <div className="gx-module-side-content">
        <CustomScrollbars className="gx-module-side-scroll">
         
    
          <div className="gx-module-side-nav">
          <Sider/>
          </div>
        </CustomScrollbars>
      </div>
    </div></div>

<div className="gx-module-box">
  <div className="gx-module-box-header">
    <span className="gx-drawer-btn gx-d-flex gx-d-lg-none">
        <i className="icon icon-menu gx-icon-btn" aria-label="Menu"
           onClick={onToggleDrawer}/>
    </span>

  </div>
  <div className="gx-module-box-content">


    <CustomScrollbars className="gx-module-content-scroll">
     <AccountList></AccountList>

    </CustomScrollbars>

  </div>
</div>
</div>


{showMessage && message.info(<span id="message-id">{alertMessage}</span>, 3, handleRequestClose)}
</div></Card></Col></Row>
    );

    
                }
export default Account;