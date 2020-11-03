import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Drawer, List, Avatar, Space } from 'antd'
import {
  MessageOutlined,
  LikeOutlined,
  FolderViewOutlined,
} from '@ant-design/icons'
import styled from 'styled-components'

import { LayHeader, Chat } from '../../component'

import { articleQuery } from '../../api/article'

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
    {' '}
    {React.createElement(icon)} {text}{' '}
  </Space>
)

class Qzhome extends Component {
  constructor() {
    super()

    this.state = {
      visible: false,
      listData: [],
    }
  }

  _onDrawerClose = () => {
    const { visible } = this.state
    this.setState({
      visible: !visible,
    })
  }

  componentDidMount() {
    articleQuery().then((res) => {
      this.setState({
        listData: res.data,
      })
    })
  }

  render() {
    const { listData, visible } = this.state
    return (
      <Wrapper className="qz-home">
        <div className="qz-header">
          <LayHeader />
        </div>

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
                    text={item.browse_count}
                    key="list-vertical-star-o"
                  />,
                  <IconText
                    icon={LikeOutlined}
                    text={item.praise_count}
                    key="list-vertical-like-o"
                  />,
                  <IconText
                    icon={MessageOutlined}
                    text={item.comment_count}
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
          onClick={() =>
            this.setState({
              visible: !visible,
            })
          }
        >
          {' '}
          Chat聊天{' '}
        </Button>

        <Drawer
          title="聊天框"
          width="350"
          placement="right"
          closable={false}
          onClose={this._onDrawerClose}
          visible={visible}
        >
          <Chat />
        </Drawer>
      </Wrapper>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    count: state.counter.count,
  }
}

// Connected Component
export default connect(mapStateToProps)(Qzhome)
