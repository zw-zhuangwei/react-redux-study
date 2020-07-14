import React, { Component } from "react";
import styled from "styled-components";

const Wrapper = styled.section`
  width: 100%;
  text-align: right;
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
          欢迎您:
          {userInfo ? (
            <>
              <img
                className="avatar"
                alt="图片"
                src={userInfo.avatar}
                width="30"
                height="30"
              />
              <span>{userInfo.userName}</span>
            </>
          ) : (
            "尚未登录,请先登录"
          )}
        </div>
      </Wrapper>
    );
  }
}
