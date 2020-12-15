import React from 'react'
import { Tabs, Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'

import styled from 'styled-components'

const { TabPane } = Tabs

const Wrapper = styled.section`
  &.qz-active-user {
    width: 500px;
    max-height: 400px;
    background-color: #fff;
    padding: 20px;
    .ant-tabs-nav {
      margin-bottom: 10px;
    }
    ul {
      display: flex;
      flex: 1;
      flex-wrap: wrap;
      padding-left: 0;
      li {
        width: 33.3%;
        list-style: none;
        text-align: center;
        margin-top: 15px;
        .name {
          display: block;
        }
      }
    }
  }
`

const ActiveUser = ({ route, match }) => {
  return (
    <Wrapper className="qz-active-user">
      <Tabs>
        <TabPane tab="活跃用户">
          <ul>
            <li>
              <Avatar size={36} icon={<UserOutlined />} />
              <span className="name">zhuangwei</span>
            </li>
            <li>
              <Avatar size={36} icon={<UserOutlined />} />
              <span className="name">zhuangwei</span>
            </li>
            <li>
              <Avatar size={36} icon={<UserOutlined />} />
              <span className="name">zhuangwei</span>
            </li>
            <li>
              <Avatar size={36} icon={<UserOutlined />} />
              <span className="name">zhuangwei</span>
            </li>
            <li>
              <Avatar size={36} icon={<UserOutlined />} />
              <span className="name">zhuangwei</span>
            </li>
            <li>
              <Avatar size={36} icon={<UserOutlined />} />
              <span className="name">zhuangwei</span>
            </li>
            <li>
              <Avatar size={36} icon={<UserOutlined />} />
              <span className="name">zhuangwei</span>
            </li>
            <li>
              <Avatar size={36} icon={<UserOutlined />} />
              <span className="name">zhuangwei</span>
            </li>
            <li>
              <Avatar size={36} icon={<UserOutlined />} />
              <span className="name">zhuangwei</span>
            </li>
            <li>
              <Avatar size={36} icon={<UserOutlined />} />
              <span className="name">zhuangwei</span>
            </li>
            <li>
              <Avatar size={36} icon={<UserOutlined />} />
              <span className="name">zhuangwei</span>
            </li>
            <li>
              <Avatar size={36} icon={<UserOutlined />} />
              <span className="name">zhuangwei</span>
            </li>
            <li></li>
          </ul>
        </TabPane>
      </Tabs>
    </Wrapper>
  )
}
export default ActiveUser
