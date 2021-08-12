import React from "react";
import {useSelector} from "react-redux";
import {Menu} from "antd";
import {Link} from "react-router-dom";
import IntlMessages from "../../util/IntlMessages";

const SubMenu = Menu.SubMenu;
//const MenuItemGroup = Menu.ItemGroup;

const HorizontalNav = () => {

  //const navStyle = useSelector(({settings}) => settings.navStyle);
  const pathname = useSelector(({settings}) => settings.pathname);

  const getNavStyleSubMenuClass = () => {
    /*switch (navStyle) {
      case NAV_STYLE_DEFAULT_HORIZONTAL:
        return "gx-menu-horizontal gx-submenu-popup-curve";
      case NAV_STYLE_INSIDE_HEADER_HORIZONTAL:
        return "gx-menu-horizontal gx-submenu-popup-curve gx-inside-submenu-popup-curve";
      case NAV_STYLE_BELOW_HEADER:
        return "gx-menu-horizontal gx-submenu-popup-curve gx-below-submenu-popup-curve";
      case NAV_STYLE_ABOVE_HEADER:
        return "gx-menu-horizontal gx-submenu-popup-curve gx-above-submenu-popup-curve";
      default:
        return "gx-menu-horizontal";

    } */
    return "gx-menu-horizontal gx-submenu-popup-curve gx-inside-submenu-popup-curve";
  };

  const selectedKeys = pathname.substr(1);
  const defaultOpenKeys = selectedKeys.split('/')[1];
  return (

    <Menu
      defaultOpenKeys={[defaultOpenKeys]}
      selectedKeys={[selectedKeys]}
      mode="horizontal">

      <SubMenu className={getNavStyleSubMenuClass()} key="main"
               title={<IntlMessages id="sidebar.main"/>}>

        <Menu.Item key="main/widgets">
          <Link to="/main/widgets">
            <IntlMessages id="sidebar.widgets"/></Link>
        </Menu.Item>

        <Menu.Item key="main/metrics">
          <Link to="/main/metrics">
            <IntlMessages id="sidebar.metrics"/></Link>
        </Menu.Item>

        <Menu.Item key="main/algolia">
          <Link to="/main/algolia">
            <IntlMessages id="sidebar.algolia"/></Link>
        </Menu.Item>

      </SubMenu>

      <SubMenu className={getNavStyleSubMenuClass()} key="matara"
               title={<IntlMessages id="sidebar.inBuiltApp"/>}>

    
      </SubMenu>

      {/*<SubMenu className={getNavStyleSubMenuClass()} key="components"
               title={<IntlMessages id="sidebar.components"/>}>

        <SubMenu className="gx-menu-horizontal" key="general" title={
          <span>
                  <i className="icon icon-all-contacts"/>
                   <IntlMessages id="sidebar.components.general"/>
              </span>}>
          <Menu.Item key="components/general/button">
            <Link to="/components/general/button">
              <IntlMessages id="sidebar.general.button"/>
            </Link>
          </Menu.Item>
          <Menu.Item key="components/general/icon">
            <Link to="/components/general/icon">
              <IntlMessages id="sidebar.general.icon"/></Link>
          </Menu.Item>
        </SubMenu>

        <SubMenu className="gx-menu-horizontal" key="navigation" title={
          <span>
                  <i className="icon icon-navigation"/>
                  <IntlMessages id="sidebar.components.navigation"/>
              </span>}>
          <Menu.Item key="components/navigation/affix">
            <Link to="/components/navigation/affix">
              <IntlMessages
                id="sidebar.navigation.affix"/></Link>
          </Menu.Item>
          <Menu.Item key="components/navigation/breadcrumb">
            <Link to="/components/navigation/breadcrumb">
              <IntlMessages
                id="sidebar.navigation.breadcrumb"/></Link>
          </Menu.Item>
          <Menu.Item key="components/navigation/dropdown">
            <Link to="/components/navigation/dropdown">
              <IntlMessages
                id="sidebar.navigation.dropdown"/></Link>
          </Menu.Item>
          <Menu.Item key="components/navigation/menu">
            <Link to="/components/navigation/menu">
              <IntlMessages
                id="sidebar.navigation.menu"/></Link>
          </Menu.Item>
          <Menu.Item key="components/navigation/pagination">
            <Link to="/components/navigation/pagination">
              <IntlMessages
                id="sidebar.navigation.pagination"/></Link>
          </Menu.Item>
          <Menu.Item key="components/navigation/steps">
            <Link to="/components/navigation/steps">
              <IntlMessages
                id="sidebar.navigation.steps"/></Link>
          </Menu.Item>
        </SubMenu>

        <SubMenu className="gx-menu-horizontal" key="dataEntry" title={
          <span>
                  <i className="icon icon-data-entry"/>
                  <IntlMessages id="sidebar.components.dataEntry"/>
              </span>}>
          <Menu.Item key="components/dataEntry/autoComplete">
            <Link to="/components/dataEntry/autoComplete">
              <IntlMessages
                id="sidebar.dataEntry.autoComplete"/></Link>
          </Menu.Item>
          <Menu.Item key="components/dataEntry/checkbox">
            <Link to="/components/dataEntry/checkbox">
              <IntlMessages
                id="sidebar.dataEntry.checkbox"/></Link>
          </Menu.Item>
          <Menu.Item key="components/dataEntry/cascader">
            <Link to="/components/dataEntry/cascader">
              <IntlMessages
                id="sidebar.dataEntry.cascader"/></Link>
          </Menu.Item>
          <Menu.Item key="components/dataEntry/datePicker">
            <Link to="/components/dataEntry/datePicker">
              <IntlMessages
                id="sidebar.dataEntry.datePicker"/></Link>
          </Menu.Item>
          <Menu.Item key="components/dataEntry/form">
            <Link to="/components/dataEntry/form">
              <IntlMessages
                id="sidebar.dataEntry.form"/></Link>
          </Menu.Item>
          <Menu.Item key="components/dataEntry/inputNumber">
            <Link to="/components/dataEntry/inputNumber">
              <IntlMessages
                id="sidebar.dataEntry.inputNumber"/></Link>
          </Menu.Item>
          <Menu.Item key="components/dataEntry/input">
            <Link to="/components/dataEntry/input">
              <IntlMessages
                id="sidebar.dataEntry.input"/></Link>
          </Menu.Item>
          <Menu.Item key="components/dataEntry/mention">
            <Link to="/components/dataEntry/mention">
              <IntlMessages
                id="sidebar.dataEntry.mention"/></Link>
          </Menu.Item>
          <Menu.Item key="components/dataEntry/rate">
            <Link to="/components/dataEntry/rate">
              <IntlMessages
                id="sidebar.dataEntry.rate"/></Link>
          </Menu.Item>
          <Menu.Item key="components/dataEntry/radio">
            <Link to="/components/dataEntry/radio">
              <IntlMessages
                id="sidebar.dataEntry.radio"/></Link>
          </Menu.Item>
          <Menu.Item key="components/dataEntry/switch">
            <Link to="/components/dataEntry/switch">
              <IntlMessages
                id="sidebar.dataEntry.switch"/></Link>
          </Menu.Item>
          <Menu.Item key="components/dataEntry/slider">
            <Link to="/components/dataEntry/slider">
              <IntlMessages
                id="sidebar.dataEntry.slider"/></Link>
          </Menu.Item>
          <Menu.Item key="components/dataEntry/select">
            <Link to="/components/dataEntry/select">
              <IntlMessages
                id="sidebar.dataEntry.select"/></Link>
          </Menu.Item>
          <Menu.Item key="components/dataEntry/treeSelect">
            <Link to="/components/dataEntry/treeSelect">
              <IntlMessages
                id="sidebar.dataEntry.treeSelect"/></Link>
          </Menu.Item>
          <Menu.Item key="components/dataEntry/transfer">
            <Link to="/components/dataEntry/transfer">
              <IntlMessages
                id="sidebar.dataEntry.transfer"/></Link>
          </Menu.Item>
          <Menu.Item key="components/dataEntry/timePicker">
            <Link to="/components/dataEntry/timePicker">
              <IntlMessages
                id="sidebar.dataEntry.timePicker"/></Link>
          </Menu.Item>
          <Menu.Item key="components/dataEntry/upload">
            <Link to="/components/dataEntry/upload">
              <IntlMessages
                id="sidebar.dataEntry.upload"/></Link>
          </Menu.Item>
        </SubMenu>

        <SubMenu className="gx-menu-horizontal" key="dataDisplay" title={
          <span>
                  <i className="icon icon-data-display"/>

                    <IntlMessages id="sidebar.components.dataDisplay"/>

              </span>}>
          <Menu.Item key="components/dataDisplay/avatar">
            <Link to="/components/dataDisplay/avatar">
              <IntlMessages
                id="sidebar.dataDisplay.avatar"/></Link>
          </Menu.Item>
          <Menu.Item key="components/dataDisplay/badge">
            <Link to="/components/dataDisplay/badge">
              <IntlMessages
                id="sidebar.dataDisplay.badge"/></Link>
          </Menu.Item>
          <Menu.Item key="components/dataDisplay/collapse">
            <Link to="/components/dataDisplay/collapse">
              <IntlMessages
                id="sidebar.dataDisplay.collapse"/></Link>
          </Menu.Item>
          <Menu.Item key="components/dataDisplay/carousel">
            <Link to="/components/dataDisplay/carousel">
              <IntlMessages
                id="sidebar.dataDisplay.carousel"/></Link>
          </Menu.Item>
          <Menu.Item key="components/dataDisplay/card">
            <Link to="/components/dataDisplay/card">
              <IntlMessages
                id="sidebar.dataDisplay.card"/></Link>
          </Menu.Item>
          <Menu.Item key="components/dataDisplay/calendar">
            <Link to="/components/dataDisplay/calendar">
              <IntlMessages
                id="sidebar.dataDisplay.calender"/></Link>
          </Menu.Item>
          <Menu.Item key="components/dataDisplay/list">
            <Link to="/components/dataDisplay/list">
              <IntlMessages
                id="sidebar.dataDisplay.list"/></Link>
          </Menu.Item>
          <Menu.Item key="components/dataDisplay/popover">
            <Link to="/components/dataDisplay/popover">
              <IntlMessages
                id="sidebar.dataDisplay.popover"/></Link>
          </Menu.Item>
          <Menu.Item key="components/dataDisplay/tree">
            <Link to="/components/dataDisplay/tree">
              <IntlMessages
                id="sidebar.dataDisplay.tree"/></Link>
          </Menu.Item>
          <Menu.Item key="components/dataDisplay/tooltip">
            <Link to="/components/dataDisplay/tooltip">
              <IntlMessages
                id="sidebar.dataDisplay.toolTips"/></Link>
          </Menu.Item>
          <Menu.Item key="components/dataDisplay/timeline">
            <Link to="/components/dataDisplay/timeline">
              <IntlMessages
                id="sidebar.dataDisplay.timeLine"/></Link>
          </Menu.Item>
          <Menu.Item key="components/dataDisplay/tag">
            <Link to="/components/dataDisplay/tag">
              <IntlMessages
                id="sidebar.dataDisplay.tag"/></Link>
          </Menu.Item>
          <Menu.Item key="components/dataDisplay/tabs">
            <Link to="/components/dataDisplay/tabs">
              <IntlMessages
                id="sidebar.dataDisplay.tabs"/></Link>
          </Menu.Item>
        </SubMenu>

        <SubMenu className="gx-menu-horizontal" key="feedBack" title={
          <span>
                  <i className="icon icon-feedback"/>
                    <IntlMessages id="sidebar.components.feedBack"/>

              </span>}>
          <Menu.Item key="components/feedBack/alert">
            <Link to="/components/feedBack/alert">
              <IntlMessages
                id="sidebar.feedBack.alert"/></Link>
          </Menu.Item>
          <Menu.Item key="components/feedBack/modal">
            <Link to="/components/feedBack/modal">
              <IntlMessages
                id="sidebar.feedBack.modal"/></Link>
          </Menu.Item>
          <Menu.Item key="components/feedBack/message">
            <Link to="/components/feedBack/message">
              <IntlMessages
                id="sidebar.feedBack.message"/></Link>
          </Menu.Item>
          <Menu.Item key="components/feedBack/notification">
            <Link to="/components/feedBack/notification">
              <IntlMessages
                id="sidebar.feedBack.notification"/></Link>
          </Menu.Item>
          <Menu.Item key="components/feedBack/progress">
            <Link to="/components/feedBack/progress">
              <IntlMessages
                id="sidebar.feedBack.progress"/></Link>
          </Menu.Item>
          <Menu.Item key="components/feedBack/popconfirm">
            <Link to="/components/feedBack/popconfirm">
              <IntlMessages id="sidebar.feedBack.popConfirm"/>
            </Link>
          </Menu.Item>
          <Menu.Item key="components/feedBack/spin">
            <Link to="/components/feedBack/spin">
              <IntlMessages
                id="sidebar.feedBack.spin"/></Link>
          </Menu.Item>
        </SubMenu>

        <SubMenu className="gx-menu-horizontal" key="others" title={
          <span>
                  <i className="icon icon-inbox"/>
                    <IntlMessages id="sidebar.components.other"/>

              </span>}>
          <Menu.Item key="components/others/anchor">
            <Link to="/components/others/anchor">
              <IntlMessages
                id="sidebar.other.anchor"/></Link>
          </Menu.Item>
          <Menu.Item key="components/others/backtop">
            <Link to="/components/others/backtop">
              <IntlMessages
                id="sidebar.other.backTop"/></Link>
          </Menu.Item>
          <Menu.Item key="components/others/divider">
            <Link to="/components/others/divider">
              <IntlMessages
                id="sidebar.other.divider"/></Link>
          </Menu.Item>
        </SubMenu>

        <SubMenu className="gx-menu-horizontal" key="table"
                 title={
                   <span>
                           <i className="icon icon-table"/>

                             <IntlMessages id="sidebar.dataDisplay.table"/>

                         </span>}>
          <Menu.Item key="components/table/basic">
            <Link to="/components/table/basic">
              <IntlMessages
                id="sidebar.view.basicTable"/></Link>
          </Menu.Item>
          <Menu.Item key="components/table/data">
            <Link to="/components/table/data">
              <IntlMessages
                id="sidebar.view.dataTable"/></Link>
          </Menu.Item>
        </SubMenu>

      </SubMenu>
*/}
      <SubMenu className={getNavStyleSubMenuClass()} key="kalem"
               title={<IntlMessages id="sidebar.extraComponents"/>}>

      

      </SubMenu>

    
      
    </Menu>

  );
};

HorizontalNav.propTypes = {};

export default HorizontalNav;

