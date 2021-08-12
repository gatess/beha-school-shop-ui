import React from 'react';
import { Menu } from 'antd';
import { ShoppingOutlined, UserOutlined, FormOutlined } from '@ant-design/icons';

const Sider  = (props) => {
  const handleClick = e => {
      debugger;
    console.log('click ', e);
  };

 
    return (
      <Menu
        onClick={handleClick}
        
        defaultOpenKeys={['sub1']}
        mode="vertical"
      >
           <Menu.Item key="1">
           <UserOutlined />
           <span>Hesap Bilgilerim</span>
          </Menu.Item>
          <Menu.Item key="2">
          <FormOutlined  />
            <span>Adres Bilgilerim</span>
          </Menu.Item>
          <Menu.Item key="3">
          <ShoppingOutlined  />
            <span>Siparişlerim</span>
          </Menu.Item>
       
      </Menu>
    );
  
}

export default Sider;