/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { createElement, useState } from 'react'
import styled from 'styled-components'
import { Button, Tooltip } from 'antd'
import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
} from '@ant-design/icons'

import { articleComment } from '@api/article'

const Wrapper = styled.section``

const ArticleMyList = () => {
  const [likes, setLikes] = useState(0)
  const [dislikes, setDislikes] = useState(0)
  const [action, setAction] = useState(null)

  const like = () => {
    setLikes(1)
    setDislikes(0)
    setAction('liked')
  }

  const dislike = () => {
    setLikes(0)
    setDislikes(1)
    setAction('disliked')
  }

  const handleComment = () => {
    articleComment({
      art_id: match.params.id,
      content: '这里是评论',
    }).then((res) => {
      console.log(res)
    })
  }
  return (
    <Wrapper>
      const actions = [
      <Tooltip key="comment-basic-like" title="Like">
        <span onClick={like}>
          {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
          <span className="comment-action">{likes}</span>
        </span>
      </Tooltip>
      ,
      <Tooltip key="comment-basic-dislike" title="Dislike">
        <span onClick={dislike}>
          {React.createElement(
            action === 'disliked' ? DislikeFilled : DislikeOutlined
          )}
          <span className="comment-action">{dislikes}</span>
        </span>
      </Tooltip>
      ,
      <span key="comment-basic-reply-to">
        <Button onClick={handleComment} type="link">
          评论
        </Button>
      </span>
      , ]
    </Wrapper>
  )
}

export default ArticleMyList
