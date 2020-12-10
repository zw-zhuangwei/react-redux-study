/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { createElement, useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import {
  Layout,
  Button,
  Input,
  Comment,
  Tooltip,
  Avatar,
  Pagination,
  message,
} from 'antd'
import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
  FormOutlined,
} from '@ant-design/icons'
import {
  articleDetails,
  articleComment,
  commentListQuery,
  commentReply,
} from '@api/article'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime) //实现moment的fromNow功能

const Wrapper = styled.section`
  max-width: 1200px;
  height: calc(100vh - 100px);
  margin: 20px auto 0 auto;
  overflow: auto;
  .hr {
    border-bottom: 1px solid #e2dbdb;
    margin: 15px 0;
  }
  .art-pagination-area {
    width: 1200px;
    text-align: right;
    padding: 10px;
    position: absolute;
    bottom: 0;
  }
  .art-comment-area {
    width: 1200px;
    padding: 10px;
    background-color: #eee;
    box-shadow: 0 0 10px #999;
    position: absolute;
    bottom: 0;
    z-index: 1;
    .art-comment-btn {
      text-align: right;
      padding-top: 10px;
      .ant-btn {
        margin-left: 5px;
      }
    }
  }
`

const { Content } = Layout
const { TextArea } = Input

const ArticleDetails = ({ match }) => {
  const [artContent, setArtContent] = useState(() => '') //文章内容
  const [artCommentList, setArtCommentList] = useState(() => []) //评论列表
  const [likes, setLikes] = useState(0)
  const [dislikes, setDislikes] = useState(0)
  const [action, setAction] = useState(null)

  const [pageNo, setPageNo] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [count, setCount] = useState(0)

  const [showTextAreaArea, setShowTextAreaArea] = useState('none')
  const [replyItem, setReplyItem] = useState(null)

  const commentRef = useRef()

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

  const handleComment = (i) => {
    articleComment({
      artId: match.params.id,
      content:
        commentRef.current && commentRef.current.state
          ? commentRef.current.state.value
          : '',
    }).then((res) => {
      commentRef.current.handleReset()
      setShowTextAreaArea('none')
      message.success('评论成功')
      commentListFunQuery()
    })
  }

  const handleReply = (item) => {
    commentReply({
      artId: match.params.id,
      comId: item._id,
      content:
        commentRef.current && commentRef.current.state
          ? commentRef.current.state.value
          : '',
    }).then((res) => {
      commentRef.current.handleReset()
      setShowTextAreaArea('none')
      message.success('评论成功')
      commentListFunQuery()
    })
  }

  const actions = (item, i, bool) => [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislike}>
        {React.createElement(
          action === 'disliked' ? DislikeFilled : DislikeOutlined
        )}
        <span className="comment-action">{dislikes}</span>
      </span>
    </Tooltip>,

    <span key="comment-basic-reply-to">
      {bool ? (
        <Button
          onClick={() => {
            setShowTextAreaArea('block')
            setReplyItem(item)
          }}
          type="link"
        >
          回复
        </Button>
      ) : null}
    </span>,
  ]

  const commentListFunQuery = () => {
    commentListQuery({
      artId: match.params.id,
      pageNo,
      pageSize,
    }).then((res) => {
      if (res.data && res.data.result) setArtCommentList(res.data.result)
      setCount(res.data.count)
    })
  }

  useEffect(() => {
    articleDetails({
      id: match.params.id,
    }).then((res) => {
      if (res.data) setArtContent(res.data.content)
    })

    // document.addEventListener(
    //   'mouseup',
    //   (e) => {
    //     setShowTextAreaArea('none')
    //     e.stopPropagation()
    //   },
    //   true
    // )
  }, [match.params.id])

  useEffect(() => {
    commentListFunQuery()
  }, [match.params.id, pageNo, pageSize])

  //选择页数改变
  const handlePageChange = (page, size) => {
    setPageNo(page)
  }
  //选择每页数量改变
  const handlePageSizeChange = (current, size) => {
    setPageSize(size)
  }

  return (
    <Wrapper>
      <Content>{artContent}</Content>
      <div className="hr"></div>
      <Button
        onClick={() => {
          setShowTextAreaArea('block')
          setReplyItem(null)
        }}
        type="link"
      >
        <FormOutlined /> 发表评论
      </Button>
      {artCommentList.map((item, i) => {
        return (
          <Comment
            key={i}
            actions={actions(item, i, 1)}
            author={<a>{item.user.userName}</a>}
            avatar={<Avatar src={item.user.avatar} alt={item.user.userName} />}
            content={<p>{item.content}</p>}
            datetime={
              <Tooltip
                title={dayjs(item.createAt).format('YYYY-MM-DD HH:mm:ss')}
              >
                <span>{dayjs(item.createAt).fromNow()}</span>
              </Tooltip>
            }
          >
            {item.reply.map((r, k) => {
              return (
                <Comment
                  key={'reply' + k}
                  actions={actions(r, k, 0)}
                  author={<a>{r.user.userName}</a>}
                  avatar={<Avatar src={r.user.avatar} alt={r.user.userName} />}
                  content={<p>{r.content}</p>}
                  datetime={
                    <Tooltip
                      title={dayjs(r.createAt).format('YYYY-MM-DD HH:mm:ss')}
                    >
                      <span>{dayjs(r.createAt).fromNow()}</span>
                    </Tooltip>
                  }
                ></Comment>
              )
            })}
          </Comment>
        )
      })}
      <div className="art-pagination-area">
        <Pagination
          total={count}
          showTotal={(total) => `总共${total}条`}
          defaultCurrent={pageNo}
          defaultPageSize={pageSize}
          pageSizeOptions={[10, 20, 50, 100, 200]}
          showSizeChanger={true}
          onChange={(page, pageSize) => handlePageChange(page, pageSize)}
          onShowSizeChange={(current, pageSize) =>
            handlePageSizeChange(current, pageSize)
          }
        />
      </div>
      <div className="art-comment-area" style={{ display: showTextAreaArea }}>
        <TextArea
          placeholder={
            !replyItem ? '请输入文章评论' : '@' + replyItem.user.userName
          }
          rows={3}
          ref={commentRef}
        />
        <div className="art-comment-btn">
          <Button onClick={() => setShowTextAreaArea('none')} size="small">
            取消
          </Button>
          {!replyItem ? (
            <Button onClick={() => handleComment()} type="primary" size="small">
              评论
            </Button>
          ) : (
            <Button
              onClick={() => handleReply(replyItem)}
              type="primary"
              size="small"
            >
              回复
            </Button>
          )}
        </div>
      </div>
    </Wrapper>
  )
}

export default ArticleDetails
