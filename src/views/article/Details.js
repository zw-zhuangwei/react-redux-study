import React, { useState, useEffect } from 'react'
import { Layout } from 'antd'
import { articleDetails } from '@api/article'

const { Content } = Layout

const ArticleDetails = ({ route, match }) => {
  const [content, setContent] = useState('')

  useEffect(() => {
    articleDetails({
      id: match.params.id,
    }).then((res) => {
      if (res.data) setContent(res.data.content)
    })
  })

  return (
    <>
      <Content style={{ padding: '0 50px' }}>{content}</Content>
    </>
  )
}

export default ArticleDetails
