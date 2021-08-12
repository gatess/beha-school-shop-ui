import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { ShoppingCartOutlined,UserOutlined } from '@ant-design/icons';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


class RightMenu extends Component {
  render() {
    return (
			<Menu mode="horizontal">
        <Menu.Item key="mail">
          <a href=""><ShoppingCartOutlined /></a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/signin"><UserOutlined /></a>
        </Menu.Item>
      </Menu>
    );
  }
}

export default RightMenu;