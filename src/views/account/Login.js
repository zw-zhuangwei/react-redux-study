import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import cookie from 'js-cookie'
import { Form, Input, Button, Checkbox, message } from 'antd'
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from '@ant-design/icons'
import { login } from '@api/account'
import action from '@redux/action'

const Wrapper = styled.section`
  padding: 4em;
  background: #f8f8f9;
  height: calc(100vh);
  .login-area {
    max-width: 400px;
    margin: 0 auto;
    background: #fff;
    padding: 30px 20px;
    .login-form-forgot {
      float: right;
    }
    .ant-col-rtl .login-form-forgot {
      float: left;
    }
    .login-form-button {
      width: 100%;
    }
    .login-form-register {
      margin-top: 10px;
    }
  }
`

const Login = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const _login = (params) => {
    login(params).then((res) => {
      if (res.code === 200) {
        cookie.set('userInfo', res.data.user)
        cookie.set('token', res.data.token)
        action.user.userInfo(dispatch, res.data.user)
        history.push(`/qzhome/home`)
        message.success(res.message)
      } else {
        message.error(res.message)
      }
    })
  }
  return (
    <Wrapper>
      <div className="login-area">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={_login}
        >
          <Form.Item
            name="userName"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
              allowClear
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="xxx">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            <div className="login-form-register">
              Or
              <Button
                type="link"
                onClick={() => history.push('/account/register')}
              >
                register now!
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </Wrapper>
  )
}

// Connected Component
export default Login
