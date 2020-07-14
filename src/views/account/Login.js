import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Form, Input, Button, Checkbox, message } from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";

import { login, updateFace } from "../../api/account";

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
`;

class Login extends Component {
  render() {
    return (
      <Wrapper>
        <div className="login-area">
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={this._login}
          >
            <Form.Item
              name="userName"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
                allowClear
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
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
                  onClick={() => this.props.history.push("/register")}
                >
                  register now!
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </Wrapper>
    );
  }

  _login = (params) => {
    login(params).then((res) => {
      if (res.code === 200) {
        localStorage.setItem("userInfo", JSON.stringify(res.data.user));
        localStorage.setItem("token", res.data.token);
        this.props.history.push("/qzhome");
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    });
  };
}

let mapStateToProps = (state) => {
  return {
    count: state.counter.count,
  };
};

// Connected Component
export default connect(mapStateToProps)(Login);
