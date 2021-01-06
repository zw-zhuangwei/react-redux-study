import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Tabs, Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'

import styled from 'styled-components'

import { activeUser } from '@api/modules/home'

const { TabPane } = Tabs

const Wrapper = styled.section`
  &.qz-active-user {
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
        cursor: pointer;
        .name {
          display: block;
        }
      }
    }
  }
`

const ActiveUser = ({ route, match }) => {
  const history = useHistory()
  const [userList, setUserList] = useState([])

  const activeUserQuery = (res) => {
    $API.home.activeUser().then((res) => {
      setUserList(res.data)
    })
  }

  useEffect(() => {
    activeUserQuery()
  }, [])

  return (
    <Wrapper className="qz-active-user">
      <Tabs>
        <TabPane tab="活跃用户">
          <ul>
            {userList.length > 0 &&
              userList.map((item, i) => {
                return (
                  <li
                    key={i}
                    onClick={() => history.push(`/qzhome/${item.uid}`)}
                  >
                    <Avatar
                      src={item.avatar}
                      size={36}
                      icon={<UserOutlined />}
                    />
                    <span className="name">{item.userName}</span>
                  </li>
                )
              })}
          </ul>
        </TabPane>
      </Tabs>
    </Wrapper>
  )
}
export default ActiveUser
