import { Menu , Button } from 'antd';
import React , { useEffect , useState } from "react";
import { AppstoreOutlined, MailOutlined, MenuUnfoldOutlined , MenuFoldOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

const Sider = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    const [sideMenu, setSideMenu] = useState();
    const [defaultSelected,setDefaultSelected]=useState();
    
    useEffect(() => {
        debugger;
        let lessonsFrom= localStorage.getItem("lessons");
        let lessons = JSON.parse(localStorage.getItem("lessons"));
        setDefaultSelected((lessons[0].id));  
        let menu = lessons.map((lessons, index) => 
        <Menu.Item key={index} value={lessons.id}>{lessons.name}</Menu.Item>);
        setSideMenu(menu);


    }, []);

    return (
        <div >
       <div className="logo" />
        <Menu
          defaultSelectedKeys={['0']}
          mode="inline"
         >
         {sideMenu}
        </Menu>
      </div>
    );
  }


  export default Sider;