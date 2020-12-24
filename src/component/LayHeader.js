import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { Menu, Button, Dropdown, Avatar, Upload, message } from 'antd'
import { UserOutlined } from '@ant-design/icons'
//import { useSelector } from 'react-redux'
import cookie from 'js-cookie'
import { layout } from '@api/account'
import { QcEventEmitter } from '.'
import { getQiniuToken, uploadFace } from '@api/account'
import logo from '../assets/img/logo.png'

const Wrapper = styled.section`
  width: 100%;
  box-shadow: 0 4px 8px 0 rgba(7, 17, 27, 0.1);
  margin-bottom: 10px;
  .header {
    display: flex;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto;
    height: 60px;
    .hearder-left-area {
      display: flex;
      align-items: center;
      justify-content: center;
      .logo {
        width: 40px;
        height: 40px;
      }
    }
    .hearder-right-area {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: row;
      .header-menu {
        text-align: right;
        border-bottom: none;
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
  }
`

const LayHeader = () => {
  console.log(process.env)
  const history = useHistory()
  //const userInfo = useSelector((state) => state.user.userInfo)
  const [current, setCurrent] = useState('home')
  const [userInfo, setUserInfo] = useState(() =>
    cookie.get('userInfo') ? JSON.parse(cookie.get('userInfo')) : {}
  )
  const [qiniuToken, setQiniuToken] = useState('')

  QcEventEmitter.addListener('loginStateEvent', () => {
    cookie.remove('token')
    cookie.remove('userInfo')
    setUserInfo(cookie.get('userInfo'))
  })

  const _handleClick = (e) => {
    setCurrent(e.key)
  }

  const _layout = () => {
    layout().then((res) => {
      cookie.remove('token')
      cookie.remove('userInfo')
      setUserInfo(cookie.get('userInfo'))
    })
  }

  const _getQiniuToken = async (file) => {
    let res = await getQiniuToken()  //此处为await 否则获取不到qiniuToken
    setQiniuToken(res.data)
  }

  const _uploadChange = async (o) => {
    if (o.file.status === 'done') {
      let path = process.env.REACT_APP_STORAGE_DOMAIN + o.file.response.key
      await uploadFace({ path })
      userInfo.avatar = path
      cookie.set('userInfo', JSON.stringify(userInfo))
      setUserInfo(JSON.parse(cookie.get('userInfo')))
      message.success('修改头像成功')
    }
  }

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <Button
          type="link"
          onClick={() =>
            history.push({
              pathname: '/article/write',
            })
          }
        >
          写博文
        </Button>
      </Menu.Item>
      <Menu.Item key="2">
        <Button type="link" onClick={() => history.push('/article/my_list')}>
          管理博文
        </Button>
      </Menu.Item>
      <Menu.Item key="3">
        <Button
          type="link"
          onClick={() => history.push('/article_third_party/artList')}
        >
          第三方资源
        </Button>
      </Menu.Item>
      <Menu.Item key="4">
        <Upload
          multiple={false}
          showUploadList={false}
          action={process.env.REACT_APP_QINIU_STORAGE_PATH}
          beforeUpload={() => _getQiniuToken()}
          onChange={(o) => _uploadChange(o)}

          data={() => {
            return {
              token: qiniuToken,
              fileKey: new Date().getTime()
            }
          }}
        >
          <span style={{ color: '#1890ff', textAlign: 'center', display: 'block', width: '90px' }}> 修改头像</span>
        </Upload>
      </Menu.Item>
      <Menu.Item key="5">
        <Button type="link" onClick={_layout}>退出账号</Button>
      </Menu.Item>
    </Menu>
  )

  return (
    <Wrapper>
      <div className="header">
        <div className="hearder-left-area">
          <img className="logo" src={logo} alt="logo" />
        </div>
        <div className="hearder-right-area">
          <Menu
            className="header-menu"
            onClick={_handleClick}
            selectedKeys={[current]}
            mode="horizontal"
          >
            <Menu.Item key="home">首页</Menu.Item>
            <Menu.Item key="other">设计</Menu.Item>
            <Menu.Item key="other1">小程序</Menu.Item>
            <Menu.Item key="other2">公众号</Menu.Item>
          </Menu>

          <div className="account">
            {userInfo && userInfo.userName ? (
              <>
                <Dropdown overlay={menu}>
                  <div>
                    <Avatar
                      size={32}
                      icon={<UserOutlined />}
                      src={userInfo.avatar}
                    />
                  </div>
                </Dropdown>
              </>
            ) : (
                <>
                  <Button
                    type="link"
                    onClick={() => history.push('/account/login')}
                  >
                    登录/注册
                </Button>
                </>
              )}
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default LayHeader
