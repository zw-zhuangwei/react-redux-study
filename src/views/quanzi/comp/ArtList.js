import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { List, Avatar, Space } from 'antd'
import {
  MessageOutlined,
  LikeOutlined,
  FolderViewOutlined,
} from '@ant-design/icons'
import styled from 'styled-components'

const Wrapper = styled.section`
  &.qz-art-list {
    height: calc(100vh - 60px);
    overflow: auto;
    background: #fff;
  }
`

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)} {text}
  </Space>
)

const ArtList = (props) => {
  const [listData, setListData] = useState([])

  const initData = () => {
    $API.article.articleQuery().then((res) => {
      setListData(res.data)
    })
  }

  useEffect(() => {
    initData()
  }, [])

  return (
    <Wrapper className="qz-art-list">
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
                <Link to={`/article/details/${item._id}`}>{item.title}</Link>
              }
              description={item.desc}
            />
            {item.content.length > 100
              ? item.content.substring(0, 100) + '...'
              : item.content}
          </List.Item>
        )}
      />
    </Wrapper>
  )
}
export default ArtList
