/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { useHistory } from 'react-router-dom'
import { Menu } from 'antd';
import {
  CalendarOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;

const LayLeftBar = () => {
  const history = useHistory()
  return (
    <>
      <Menu
        style={{ height: '100%' }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode='inline'
        theme='light'
      >
        <Menu.Item key="1" icon={<CalendarOutlined />}>
          <a onClick={() => history.push('/person/dictionary')}>数据字典</a>
        </Menu.Item>
        <Menu.Item key="2" icon={<CalendarOutlined />}>
          <a onClick={() => history.push('/person/article_resource')}>文章资源管理</a>
        </Menu.Item>
        <SubMenu key="sub1" icon={<AppstoreOutlined />} title="文章管理">
          <Menu.Item key="3">
            <a onClick={() => history.push('/person/article_list')}>我的博文列表</a>
          </Menu.Item>
          <Menu.Item key="4">
            <a onClick={() => history.push('/person/article_write')}>写博文</a>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </>
  );
};

export default LayLeftBar