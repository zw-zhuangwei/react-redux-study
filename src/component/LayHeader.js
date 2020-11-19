import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { Menu, Button, Dropdown } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { layout } from '@api/account'
import { QcEventEmitter } from '.'
import { renderRoutes } from 'react-router-config'

const Wrapper = styled.section`
  width: 100%;
  box-shadow: 0 4px 8px 0 rgba(7, 17, 27, 0.1);
  margin-bottom: 10px;
  .header-content {
    display: flex;
    justify-content: space-between;
    width: 1200px;
    margin: 0 auto;
    .header-menu {
      text-align: right;
      li {
        font-weight: 500;
        font-size: 16px;
      }
    }
    .account {
      line-height: 44px;
      .avatar {
        border-radius: 50%;
      }
    }
  }
`

const LayHeader = ({ route }) => {
  const [current, setCurrent] = useState('home')
  const [userInfo, setUserInfo] = useState(() =>
    JSON.parse(localStorage.getItem('userInfo'))
  )
  const history = useHistory()

  QcEventEmitter.addListener('contextClick', () => {
    setUserInfo(null)
  })

  const _handleClick = (e) => {
    setCurrent(e.key)
  }

  const _layout = () => {
    layout().then((res) => {
      localStorage.setItem('token', '')
      localStorage.setItem('userInfo', null)
      setUserInfo(null)
    })
  }

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <Button type="link" onClick={() => history.push('/article/write')}>
          写博文
        </Button>
        <Button type="link" onClick={() => history.push('/article/my_list')}>
          管理博文
        </Button>
      </Menu.Item>
      <Menu.Item key="2">
        <Button type="link" onClick={_layout}>
          退出账号
        </Button>
      </Menu.Item>
    </Menu>
  )

  return (
    <Wrapper>
      <div className="header-content">
        <Menu
          className="header-menu"
          onClick={_handleClick}
          selectedKeys={[current]}
          mode="horizontal"
        >
          <Menu.Item key="home">首页</Menu.Item>
          <Menu.Item key="other">设计</Menu.Item>
        </Menu>

        <div className="account">
          {userInfo ? (
            <>
              <Dropdown overlay={menu}>
                <div>
                  <img
                    className="avatar"
                    alt="图片"
                    src={userInfo.avatar}
                    width="24"
                    height="24"
                  />
                  <span> {userInfo.userName}</span> <DownOutlined />
                </div>
              </Dropdown>
            </>
          ) : (
            <>
              <Button
                type="link"
                onClick={() => history.push('/account/login')}
              >
                登录
              </Button>
              <Button
                type="link"
                onClick={() => history.push('/account/register')}
              >
                注册
              </Button>
            </>
          )}
        </div>
      </div>
      {renderRoutes(route.routes, {
        someProp: 'these extra props are optional12121',
      })}
    </Wrapper>
  )
}

export default LayHeader
