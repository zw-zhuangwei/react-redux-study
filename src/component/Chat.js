import React, { Component } from "react";
import { Button, message } from "antd";
import IO from "socket.io-client";
import styled from "styled-components";
import BraftEditor from "braft-editor";
import "braft-editor/dist/index.css";

const Wrapper = styled.section`
  .chat-show-area {
    height: calc(100vh - 100px);
    border: 1px solid #ff5256;
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
  .braft-editor-area {
    position: relative;
    top: 0;
    right: 0;
    bottom: 10px;
    width: 100%;
    .braft-editor {
      width: 100%;
      height: 100px;
    }
    .bf-content {
      height: 100px;
    }
    .chat-send {
      position: absolute;
      top: 50px;
      right: 0;
      z-index: 10;
      cursor: pointer;
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
    super(props);

    this.state = {
      controls: ["bold", "italic", "underline", "emoji"],
      editorState: BraftEditor.createEditorState(null),
      chatMsg: [],
      scrollTo: null,
      chatHeight: props.height,
    };

    let socket = IO(
      `http://localhost:3000?token=${localStorage.getItem("token")}`
    );

    socket.on("connect", () => {
      console.log("client connect success");
      socket.emit("join");
    });

    socket.on("response", (res) => {
      if (res.type === 401) {
        message.error(res.message);
        return false;
      }

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
    // this.state.editorState = editorState; //用setState 没次输入都要重新渲染 消耗性能
  };

  _sendMsg = () => {
    const { editorState } = this.state;
    this.socket.emit("request", editorState.toText());
    this.setState({ editorState: BraftEditor.createEditorState(null) }); // 清空编辑器内容
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
    this._entrySendMsg();
    this.setState({
      scrollTo: document.getElementById("chat-show-area"),
    });
  }

  render() {
    const { controls, editorState, chatMsg, chatHeight } = this.state;
    return (
      <Wrapper>
        <div
          id="chat-show-area"
          className="chat-show-area"
          style={{ height: chatHeight - 80 + "px" }}
        >
          <RenderChat chatMsg={chatMsg} />
        </div>
        <div className="braft-editor-area">
          <BraftEditor
            className="braft-editor"
            placeholder={"请输入内容"}
            controls={controls}
            value={editorState}
            onChange={this._handleEditorChange}
            onSave={this._submitContent}
          />
          <Button className="chat-send" onClick={this._sendMsg}>
            发送数据
          </Button>
        </div>
      </Wrapper>
    );
  }
}
