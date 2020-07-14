import React, { Component } from "react";
import { Button } from "antd";
import IO from "socket.io-client";
import styled from "styled-components";
import BraftEditor from "braft-editor";
import "braft-editor/dist/index.css";

const Wrapper = styled.section`
  .chat-show-area {
    height: calc(100vh - 100px);
    border: 1px solid #ff5256;
    overflow: auto;
  }
  .braft-editor-area {
    position: absolute;
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

export default class Demo2 extends Component {
  constructor(props) {
    super(props);

    let socket = IO("http://localhost:3000");

    socket.on("connect", () => {
      socket.on("response", (data) => {
        this.setState({
          chatMsg: [...this.state.chatMsg, data],
        });

        this.scrollTo = this.scrollTo
          ? this.scrollTo
          : document.getElementById("chat-show-area");
        this.scrollTo.scrollTop = this.scrollTo.scrollHeight;
      });

      socket.on("broadcast", (data) => {
        console.log(data);
        this.setState({
          chatMsg: [...this.state.chatMsg, data],
        });
      });

      // disconnect
      socket.on("disconnect", () => {
        console.log("disconnect...");
      });
    });

    this.socket = socket;
  }

  state = {
    controls: ["bold", "italic", "underline", "emoji"],
    editorState: BraftEditor.createEditorState(null),
    chatMsg: [],
    scrollTo: null,
  };

  _handleEditorChange = (editorState) => {
    this.setState({ editorState });
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
    const { controls, editorState, chatMsg } = this.state;
    return (
      <Wrapper>
        <div id="chat-show-area" className="chat-show-area">
          {chatMsg.map((v, i) => {
            return <div key={i}>{v}</div>;
          })}
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
