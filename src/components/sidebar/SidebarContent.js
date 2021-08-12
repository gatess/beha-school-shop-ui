import React from "react";
import { Menu } from "antd";
import { Link,useHistory } from "react-router-dom";
import {UnorderedListOutlined  } from '@ant-design/icons';
import CustomScrollbars from "util/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";
import UserProfile from "./UserProfile";
import AppsNavigation from "./AppsNavigation";
import {
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  THEME_TYPE_LITE
} from "../../constants/ThemeSetting";
import IntlMessages from "../../util/IntlMessages";
import { useSelector } from "react-redux";

const SidebarContent = (props) => {
  const history = useHistory();
  console.log(props.menuType);
  let menuType = props.menuType;
  if (props.menuType == "admin") {
  

  }

  let { navStyle, themeType, pathname } = useSelector(({ settings }) => settings);

  const getNoHeaderClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR || navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR) {
      return "gx-no-header-notifications";
    }
    return "";
  };
  const signOutAdmin = () => {
    debugger;
    localStorage.removeItem('adminResult');
    history.push({
      pathname: '/admin'      
    });
  }

  const signOutSchoolAdmin = () => {
    debugger;
    localStorage.removeItem('schoolAdminResult');
    localStorage.removeItem('schoolId');
    history.push({
      pathname: '/schooladmin'      
    });
  }

  const selectedKeys = pathname.substr(1);
  const defaultOpenKeys = selectedKeys.split('/')[1];
  return (
    <>

      <SidebarLogo menuType={menuType} />
      <div className="gx-sidebar-content">
        <div className={`gx-sidebar-notifications ${getNoHeaderClass(navStyle)}`}>
          <UserProfile menuType={props.menuType} />
        </div>
        <CustomScrollbars className="gx-layout-sider-scrollbar">
        {menuType=='admin' ? (
          <Menu
            defaultOpenKeys={[defaultOpenKeys]}
            selectedKeys={[selectedKeys]}
            theme={themeType === THEME_TYPE_LITE ? 'lite' : 'dark'}
            mode="inline">
                <Menu.Item  key="1"><i style={{marginRight:"30px"}} className="icon icon-shopping-cart"/>Siparişler<Link to="/admin/orderlist">
                  </Link></Menu.Item>
                <Menu.Item key="2"><i style={{marginRight:"30px"}} className="icon icon-user"/>Müşteriler<Link to="/admin/customerlist">
                  </Link></Menu.Item>
                <Menu.Item key="3" ><i style={{marginRight:"30px"}} className="icon icon-widgets"/>Ürünler<Link to="/admin/productlist">
                  </Link></Menu.Item>
                  <Menu.Item key="4"  onClick={signOutAdmin}><i style={{marginRight:"30px"}} className="icon icon-signin"/>Çıkış Yap</Menu.Item>

          </Menu>
        ) : (
          <Menu
            defaultOpenKeys={[defaultOpenKeys]}
            selectedKeys={[selectedKeys]}
            theme={themeType === THEME_TYPE_LITE ? 'lite' : 'dark'}
            mode="inline">
                <Menu.Item  key="1"><i style={{marginRight:"30px"}} className="icon icon-user"/>Öğretmen Ekle<Link to="/schooladmin/addteacher">
                  </Link></Menu.Item>
                <Menu.Item key="2"><i style={{marginRight:"30px"}} className="icon icon-add"/>Ders Ekle<Link to="/schooladmin/addlesson">
                  </Link></Menu.Item>
                  <Menu.Item key="3"  onClick={signOutSchoolAdmin}><i style={{marginRight:"30px"}} className="icon icon-signin"/>Çıkış Yap</Menu.Item>

          </Menu>
        )}
         
        </CustomScrollbars>
      </div>
    </>
  );
};

SidebarContent.propTypes = {};
export default SidebarContent;

