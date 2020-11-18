//import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { Form, Input, Button, message } from 'antd'
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  MobileOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from '@ant-design/icons'

import { register } from '../../api/account'

const Wrapper = styled.section`
  padding: 4em;
  background: #f8f8f9;
  height: calc(100vh);
  .reg-area {
    max-width: 400px;
    margin: 0 auto;
    background: #fff;
    padding: 30px 20px;
    .reg-form-forgot {
      float: right;
    }
    .ant-col-rtl .reg-form-forgot {
      float: left;
    }
    .reg-form-button {
      width: 100%;
    }
    .reg-form-register {
      margin-top: 10px;
    }
  }
`
const Register = () => {
  const history = useHistory()
  const _register = (params) => {
    register(params).then((res) => {
      if (res.code === 200) {
        message.success(res.message)
        history.push('/login')
      } else {
        message.error(res.message)
      }
    })
  }
  return (
    <Wrapper>
      <div className="reg-area">
        <Form
          name="normal_reg"
          className="reg-form"
          initialValues={{ remember: true }}
          onFinish={_register}
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
            name="email"
            rules={[{ required: true, message: 'Please input your Email!' }]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
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
          <Form.Item
            name="mobile"
            rules={[{ required: true, message: 'Please input your Mobile!' }]}
          >
            <Input
              prefix={<MobileOutlined className="site-form-item-icon" />}
              placeholder="Mobile"
              allowClear
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="reg-form-button"
            >
              register in
            </Button>
            <div className="reg-form-register">
              Or
              <Button type="link" onClick={() => history.push('/login')}>
                login now!
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </Wrapper>
  )
}

export default Register
