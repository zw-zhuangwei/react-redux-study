import React, { useState, useEffect } from 'react'
import { Layout } from 'antd'
import { LayHeader } from '../../component'
import { articleDetails } from '../../api/article'

const { Content } = Layout

const ArticleDetails = () => {
  // const [details,setDetails] = useState({});
  const [content, setContent] = useState('')
  const hrefArr = window.location.href.split('/')
  const articleId = hrefArr[hrefArr.length - 1]

  useEffect(() => {
    articleDetails({
      id: articleId,
    }).then((res) => {
      if (res.data) setContent(res.data.content)
    })
  }, [articleId])

  return (
    <>
      <div className="qz-header">
        <LayHeader />
      </div>
      <Content style={{ padding: '0 50px' }}>{content}</Content>
    </>
  )
}

export default ArticleDetails
