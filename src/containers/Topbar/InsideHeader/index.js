import React, {useState} from "react";
import {Button, Dropdown, Layout, Menu, message, Popover} from 'antd';
import {DownOutlined} from '@ant-design/icons';
import {connect, useDispatch, useSelector} from "react-redux";
import SearchBox from "components/SearchBox";
import UserInfo from "components/UserInfo";
import AppNotification from "components/AppNotification";
import HorizontalNav from "../HorizontalNav";
import {Link} from "react-router-dom";
import {switchLanguage, toggleCollapsedSideNav} from "../../../appRedux/actions/Setting";
import IntlMessages from "../../../util/IntlMessages";
import { useHistory } from "react-router-dom";

const {Header} = Layout;

const menu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1">Products</Menu.Item>
    <Menu.Item key="2">Apps</Menu.Item>
    <Menu.Item key="3">Blogs</Menu.Item>
  </Menu>
);

function handleMenuClick(e) {
  message.info('Click on menu item.');
}

const InsideHeader = () => {

  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState('');
  /*const locale = useSelector(({settings}) => settings.locale);*/
  const navCollapsed = useSelector(({settings}) => settings.navCollapsed);
  const history = useHistory();
  const logOut  = () => {
    debugger;
    localStorage.removeItem('userId');
    //localStorage.setItem('userId',JSON.stringify(null));
    history.push({
      pathname: '/app'      
    });
  }
 
  
 /* const languageMenu = () => (
    <CustomScrollbars className="gx-popover-lang-scroll">
      <ul className="gx-sub-popover">
        {languageData.map(language =>
          <li className="gx-media gx-pointer" key={JSON.stringify(language)}  onClick={(e) =>
            dispatch(switchLanguage(language)) }>
            <i className={`flag flag-24 gx-mr-2 flag-${language.icon}`}/>
            <span className="gx-language-text">{language.name}</span>
          </li>
        )}
      </ul>
    </CustomScrollbars>);*/

  const updateSearchChatUser = (evt) => {
    setSearchText(evt.target.value)
  };
  let userId = localStorage.getItem('userId');
  console.log(userId);
  return (
    <div className="gx-header-horizontal gx-header-horizontal-dark gx-inside-header-horizontal">
      <div className="gx-header-horizontal-top">
        <div className="gx-container">
          <div className="gx-header-horizontal-top-flex">
            <div className="gx-header-horizontal-top-left">
              <i className="icon icon-alert gx-mr-3"/>
              <a href="/app"  style={{color: "#fa8c15"}}><p className="gx-mb-0 gx-text-truncate"><IntlMessages id="app.announced"/></p></a>
            </div>
            <ul className="gx-login-list">
            { localStorage.getItem('userId') ? (
              <ul className="gx-login-list">
              <li><a href="/app/myaccount"  style={{color: "#fa8c15"}}>Hesabım</a></li>
              <li><a onClick={logOut}  style={{color: "#fa8c15"}}>Çıkış Yap</a></li></ul>) : 
            ( <ul className="gx-login-list">
            <li><a href="/app/signin"  style={{color: "#fa8c15"}}>Giriş Yap</a></li>
            <li><a href="/app/signup"  style={{color: "#fa8c15"}}>Üye Ol</a></li></ul>
            
            ) }
           
            </ul>
          </div>
        </div>
      </div>


      <Header
        className="gx-header-horizontal-main">
        <div className="gx-container">
          <div className="gx-header-horizontal-main-flex">
            <div className="gx-d-block gx-d-lg-none gx-linebar gx-mr-xs-3 6e">
              <i className="gx-icon-btn icon icon-menu"
                onClick={() => {
                   dispatch(toggleCollapsedSideNav(!navCollapsed));
                 }} 
              />
            </div>
            <Link to="/" className="gx-d-block gx-d-lg-none gx-pointer gx-mr-xs-3 gx-pt-xs-1 gx-w-logo">
              <img alt="" src={require("assets/images/w-logo.png")}/></Link>
            <Link to="/" className="gx-d-none gx-d-lg-block gx-pointer gx-mr-xs-5 gx-logo">
              <img alt="" style={{height:"50px"}} src={require("assets/images/logo.png")}/></Link>

            <div className="gx-header-horizontal-nav gx-header-horizontal-nav-curve gx-d-none gx-d-lg-block">
              <HorizontalNav/>
            </div>
            <ul className="gx-header-notifications gx-ml-auto">
              <li className="gx-notify gx-notify-search">
                <Popover overlayClassName="gx-popover-horizantal"
                         placement="bottomRight" content={
                  <div className="gx-d-flex"><Dropdown overlay={menu}>
                    <Button>
                      Category <DownOutlined />
                    </Button>
                  </Dropdown>
                    <SearchBox styleName="gx-popover-search-bar"
                               placeholder="Search in app..."
                               onChange={updateSearchChatUser}
                               value={searchText}/></div>
                } trigger="click">
                  {/*<span className="gx-pointer gx-d-block"><i className="icon icon-search-new"/></span>*/}
                </Popover>
              </li>
              { localStorage.getItem('userId') ? (
              <li className="gx-user-nav"><UserInfo/></li>) :(<li></li>)}
            </ul>
          </div>
        </div>
      </Header>
    </div>
  );
};

const mapStateToProps = ({settings}) => {
  const {locale, navCollapsed} = settings;
  return {locale, navCollapsed}
};
export default connect(mapStateToProps, {toggleCollapsedSideNav, switchLanguage})(InsideHeader);
//export default InsideHeader;