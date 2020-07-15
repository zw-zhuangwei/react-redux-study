import React, { Component } from "react";
import styled from "styled-components";
import { Button } from "antd";

const Wrapper = styled.section`
  width: 100%;
  text-align: right;
  margin-right: 20px;
  .avatar {
    border-radius: 50%;
  }
`;

export default class LayHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: JSON.parse(localStorage.getItem("userInfo")),
    };
  }

  render() {
    let { userInfo } = this.state;
    return (
      <Wrapper>
        <div>
          {" "}
          {userInfo ? (
            <>
              <img
                className="avatar"
                alt="图片"
                src={userInfo.avatar}
                width="30"
                height="30"
              />
              <span> 欢迎您: {userInfo.userName}</span>
            </>
          ) : (
            <>
              <Button
                type="link"
                onClick={() => this.props.history.push("/login")}
              >
                尚未登录
              </Button>
            </>
          )}
        </div>
      </Wrapper>
    );
  }
}
