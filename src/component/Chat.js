import React, { Component } from "react";
import { Button, Modal } from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import IO from "socket.io-client";
import styled from "styled-components";
import E from "wangeditor";


const Wrapper = styled.section`
   height: 100%;
   overflow: hidden;
  .chat-show-area {
    overflow: auto;
    padding: 10px;
    .sys-broadcast {
      text-align: center;
      color: #94941f;
      font-size: 12px;
    }
    .chat-msg {
      .chat-msg-other {
        display: flex;
        flex-direction: row;
        margin-bottom: 8px;
        .user-avatar {
          border-radius: 20px;
        }
        .chat-owner {
          display: block;
          font-size: 12px;
          text-align: center;
          color: #ff5256;
        }
        .chat-content {
          margin-left: 7px;
          word-break: break-all;
          .user-name {
            color: #001fffa1;
          }
        }
      }
      .chat-msg-self {
        display: flex;
        flex-direction: row-reverse;
        margin-bottom: 8px;
        .user-avatar {
          border-radius: 20px;
        }
        .chat-owner {
          display: block;
          font-size: 12px;
          text-align: center;
          color: #ff5256;
        }
        .chat-content {
          margin-right: 7px;
          word-break: break-all;
          .user-name {
            color: #001fffa1;
            display: block;
            text-align: right;
          }
        }
      }
    }
  }
  .chat-editor-area{
    position: relative;
    .btn-send-chat{
      position: absolute;
      right: 10px;
      bottom: 30px;
      z-index: 10000;
    }
  }
`;
let userInfo = null;
function RenderChat(props) {
  userInfo = userInfo ? userInfo : JSON.parse(localStorage.getItem("userInfo"));
  let { chatMsg } = props;
  return (
    <>
      {chatMsg.map((v, i) => {
        if (v.type === 100) {
          return (
            <div key={i} className="sys-broadcast">
              {v.data.content}
            </div>
          );
        } else {
          return (
            <div key={i} className="chat-msg">
              {v.data.user.uid !== userInfo.uid ? (
                <div className="chat-msg-other">
                  <div>
                    <img
                      className="user-avatar"
                      alt="图片"
                      src={v.data.user.avatar}
                      width="40"
                      height="40"
                    />
                    {v.data.user.owner ? (
                      <span className="chat-owner">圈主</span>
                    ) : null}
                  </div>
                  <div className="chat-content">
                    <span className="user-name">{v.data.user.userName}</span>
                    <div>{v.data.content}</div>
                  </div>
                </div>
              ) : (
                <div className="chat-msg-self">
                  <div>
                    <img
                      className="user-avatar"
                      alt="图片"
                      src={v.data.user.avatar}
                      width="40"
                      height="40"
                    />
                    {v.data.user.owner ? (
                      <span className="chat-owner">圈主</span>
                    ) : null}
                  </div>
                  <div className="chat-content">
                    <span className="user-name">{v.data.user.userName}</span>
                    <div>{v.data.content}</div>
                  </div>
                </div>
              )}
            </div>
          );
        }
      })}
    </>
  );
}
export default class Chat extends Component {
  constructor(props) {
    super();

    this.state = {
      chatMsg: [],
      scrollTo: null,
    //  chatHeight: props.height,
      wEditor: {}
    };

    let hrefArr = window.location.href.split('/') 
    let roomId = hrefArr[hrefArr.length - 1]
    let socket = IO(
      `http://localhost:3000?token=${localStorage.getItem("token")}&roomId=${roomId}`
    );

    socket.on("connect", () => {
      console.log("client connect success");
      socket.emit("join");
    });
    socket.on("response", (res) => {
      const { wEditor } = this.state;
      if (res.type === 401) {
        Modal.confirm({
          title: '提示',
          icon: <ExclamationCircleOutlined />,
          content: res.message,
          onOk(){window.location.href="/login"},
          okText: '确认',
          cancelText: '取消',
        });
        return false;
      }

      wEditor.txt.clear()  //清除编辑器内容

      this.setState({
        chatMsg: [...this.state.chatMsg, res],
      });

      this.scrollTo = this.scrollTo
        ? this.scrollTo
        : document.getElementById("chat-show-area");
      this.scrollTo.scrollTop = this.scrollTo.scrollHeight;
    });

    socket.on("broadcast", (data) => {
      this.setState({
        chatMsg: [...this.state.chatMsg, data],
      });
    });

    // disconnect
    socket.on("disconnect", () => {
      console.log("disconnect...");
    });

    this.socket = socket;
  }

  _handleEditorChange = (editorState) => {
    this.setState({ editorState });
  };

  _initEditor = () => {
    const wEditor = new E("#wEditor");
    wEditor.config.placeholder = '请输入聊天内容...'
    wEditor.config.focus = false
    wEditor.config.height = 100
    wEditor.config.menus = []
    return wEditor
  }

  _sendMsg = () => {
    const { wEditor } = this.state;
    this.socket.emit("request", wEditor.txt.text()); // 后期根据type进行消息类型处理
  };

  _entrySendMsg = () => {
    document.onkeydown = (event) => {
      var e = event || window.event;
      if (e && e.keyCode === 13) {
        this._sendMsg();
      }
      event.stopPropagation();
    };
  };

  componentDidMount() {
    const wEditor = this._initEditor()
    wEditor.create()
    this._entrySendMsg();
    this.setState({
      scrollTo: document.getElementById("chat-show-area"),
      wEditor
    });
  }

  render() {
    const { chatMsg } = this.state;
    return (
      <Wrapper>
          <div
            id="chat-show-area"
            className="chat-show-area"
            style={{ height: document.body.clientHeight - 170 + "px" }}
          >
            <RenderChat chatMsg={chatMsg} />
          </div>
          <div className="chat-editor-area">
            <div id="wEditor"></div>
            <Button type="link" className="btn-send-chat" onClick={this._sendMsg}>发送</Button>
          </div>
      </Wrapper>
    );
  }
}
