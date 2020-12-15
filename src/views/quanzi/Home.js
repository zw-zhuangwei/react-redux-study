import React, { useState, useEffect } from 'react'
import { Button, Drawer, List, Avatar, Space } from 'antd'
import {
  MessageOutlined,
  LikeOutlined,
  FolderViewOutlined,
} from '@ant-design/icons'
import styled from 'styled-components'

import { Chat } from '@components'

import { articleQuery } from '@api/article'

const Wrapper = styled.section`
  &.qz-home {
    .qz-container {
      width: 1200px;
      height: calc(100vh - 60px);
      overflow: auto;
      background: #eee;
      margin: 0 auto;
    }
  }
  .btn-affix-chat {
    position: fixed;
    right: 10px;
    top: 40%;
  }
`

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)} {text}
  </Space>
)

const Qzhome = ({ route, match }) => {
  const [visible, setVisible] = useState(false)
  const [listData, setListData] = useState([])

  const _onDrawerClose = () => {
    setVisible(!visible)
  }

  const initData = () => {
    articleQuery().then((res) => {
      setListData(res.data)
    })
  }

  useEffect(() => {
    initData()
  }, [])

  return (
    <Wrapper className="qz-home">
      <div className="qz-container">
        <List
          itemLayout="vertical"
          size="large"
          dataSource={listData}
          renderItem={(item) => (
            <List.Item
              key={item.title}
              actions={[
                <IconText
                  icon={FolderViewOutlined}
                  text={item.browseCount ? item.browseCount : 0}
                  key="list-vertical-star-o"
                />,
                <IconText
                  icon={LikeOutlined}
                  text={item.praiseCount ? item.praiseCount : 0}
                  key="list-vertical-like-o"
                />,
                <IconText
                  icon={MessageOutlined}
                  text={item.commentCount ? item.commentCount : 0}
                  key="list-vertical-message"
                />,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={item.user && item.user[0] && item.user[0].avatar}
                  />
                }
                title={
                  <a href={`/article/details/${item._id}`}>{item.title}</a>
                }
                description={item.desc}
              />
              {item.content}
            </List.Item>
          )}
        />
      </div>

      <Button
        type="link"
        className="btn-affix-chat"
        onClick={() => setVisible(!visible)}
      >
        Chat聊天
      </Button>

      <Drawer
        title="聊天框"
        width="350"
        placement="right"
        closable={false}
        onClose={_onDrawerClose}
        visible={visible}
      >
        <Chat />
      </Drawer>
    </Wrapper>
  )
}
export default Qzhome
