import React, { Component } from "react";
import styled from "styled-components";
import { Menu,Button} from "antd";

const Wrapper = styled.section`
   width: 100%;
   box-shadow: 0 4px 8px 0 rgba(7,17,27,.1);
   margin-bottom: 10px;
  .header-content{
    display: flex;
    justify-content: space-between;
    width: 1200px;
    margin: 0 auto;
    .header-menu{
      text-align: right;
      li{
        font-weight: 500;
        font-size: 16px;
      }
    }
    .account{
      line-height: 44px;
      .avatar {
        border-radius: 50%;
      }
    }
  }
`;


export default class LayHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: JSON.parse(localStorage.getItem("userInfo")),
      current: 'home',
    };
  }

  handleClick = e => {
    this.setState({ current: e.key });
  };

  render() {
    let { userInfo,current } = this.state;
    return (
      <Wrapper>

        <div className="header-content">

          <Menu className="header-menu" onClick={this.handleClick} selectedKeys={[current]} mode="horizontal">
            <Menu.Item key="home">首页</Menu.Item>
            <Menu.Item key="other">设计</Menu.Item>
          </Menu>    

          <div className="account">
            {userInfo ? (
              <>
                <img
                  className="avatar"
                  alt="图片"
                  src={userInfo.avatar}
                  width="24"
                  height="24"
                />
                <span> {userInfo.userName}</span>
              </>
            ) : (
              <>
                <Button type="link" onClick={() => this.props.history.push("/login")}>登录</Button>
                <Button type="link" onClick={() => this.props.history.push("/register")}>注册</Button>
              </>
            )}
          </div>

        </div>

      </Wrapper>
    );
  }
}
