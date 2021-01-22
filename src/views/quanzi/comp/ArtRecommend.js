/* eslint-disable react/jsx-no-target-blank */
import React, { useState, useEffect } from 'react'
import { Tabs, List, Avatar } from 'antd'
import styled from 'styled-components'
const { TabPane } = Tabs

const Wrapper = styled.section`
  &.qz-recommend {
    background-color: #fff;
    padding: 0 20px;
    height: 500px;
    overflow: auto;
  }
`
const ArtRecommend = ({ route, match }) => {
  const [dataSource, setDataSource] = useState([])
  const articleThirdPartyFunQuery = () => {
    $API.person.articleThirdPartyQuery().then((res) => {
      setDataSource(res.data)
    })
  }
  useEffect(() => {
    articleThirdPartyFunQuery()
  }, [])

  return (
    <Wrapper className="qz-recommend">
      <Tabs>
        <TabPane tab="第三方资源">
          <List
            className="aaaa"
            itemLayout="horizontal"
            dataSource={dataSource}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
                  title={
                    <a target="_blank" href={item.path}>
                      {item.title}
                    </a>
                  }
                  description={item.desc}
                />
              </List.Item>
            )}
          />
        </TabPane>
      </Tabs>
    </Wrapper>
  )
}
export default ArtRecommend
