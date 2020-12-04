import React, { useState, useEffect } from 'react'
import { Button, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import cookie from 'js-cookie'
import IO from 'socket.io-client'
import styled from 'styled-components'
import E from 'wangeditor'

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
  .chat-editor-area {
    position: relative;
    .btn-send-chat {
      position: absolute;
      right: 10px;
      bottom: 30px;
      z-index: 10000;
    }
  }
`

let userInfo = null
const RenderChat = ({ chatMsg }) => {
  userInfo = userInfo
    ? userInfo
    : cookie.get('userInfo')
    ? JSON.parse(cookie.get('userInfo'))
    : {}
  // const [chatMsg, setChatMsg] = useState(message)
  // setChatMsg(message)

  return (
    <>
      {chatMsg.map((v, i) => {
        if (v.type === 100) {
          return (
            <div key={i} className="sys-broadcast">
              {v.data.content}
            </div>
          )
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
          )
        }
      })}
    </>
  )
}

let chatMsgStorage = []
let wEditor = {}
let scrollTo = {}
let socket

const Chat = () => {
  const [chatMsg, setChatMsg] = useState([])

  const _initEditor = () => {
    wEditor = new E('#wEditor')
    wEditor.config.placeholder = '请输入聊天内容...'
    wEditor.config.focus = false
    wEditor.config.height = 100
    wEditor.config.menus = []

    wEditor.create()
  }

  const _entrySendMsg = () => {
    document.onkeydown = (event) => {
      var e = event || window.event
      if (e && e.keyCode === 13) {
        _sendMsg()
      }
      event.stopPropagation()
    }
  }

  //键盘事件
  _entrySendMsg()

  useEffect(() => {
    //初始化编辑器
    _initEditor()

    // 滚动对象
    scrollTo = document.getElementById('chat-show-area')

    let hrefArr = window.location.href.split('/')
    let roomId = hrefArr[hrefArr.length - 1]
    socket = IO(
      `http://192.168.4.59:3000?token=${cookie.get('token')}&roomId=${roomId}`
    )

    //socket connect
    socket.on('connect', () => {
      console.log('client connect success')
      socket.emit('join')
    })
    //socket response
    socket.on('response', (res) => {
      if (res.type === 401) {
        Modal.confirm({
          title: '提示',
          icon: <ExclamationCircleOutlined />,
          content: res.message,
          onOk() {
            window.location.href = '/account/login'
          },
          okText: '确认',
          cancelText: '取消',
        })
        return false
      }
      wEditor.txt.clear() //清除编辑器内容
      chatMsgStorage = [...chatMsgStorage, res]
      setChatMsg(chatMsgStorage)
      scrollTo.scrollTop = scrollTo.scrollHeight
    })

    //socket broadcast
    socket.on('broadcast', (res) => {
      wEditor.txt.clear() //清除编辑器内容
      chatMsgStorage = [...chatMsgStorage, res]
      setChatMsg(chatMsgStorage)
      scrollTo.scrollTop = scrollTo.scrollHeight
    })

    //socket disconnect
    socket.on('disconnect', () => {
      console.log('disconnect...')
    })
  }, [])

  const _sendMsg = () => {
    socket.emit('request', wEditor.txt.text()) // 后期根据type进行消息类型处理
  }

  return (
    <Wrapper>
      <div
        id="chat-show-area"
        className="chat-show-area"
        style={{ height: document.body.clientHeight - 170 + 'px' }}
      >
        <RenderChat chatMsg={chatMsg} />
      </div>
      <div className="chat-editor-area">
        <div id="wEditor"></div>
        <Button type="link" className="btn-send-chat" onClick={_sendMsg}>
          发送
        </Button>
      </div>
    </Wrapper>
  )
}

export default Chat
