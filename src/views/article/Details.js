/* eslint-disable react-hooks/exhaustive-deps */
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
  Empty,
} from 'antd'
import { DislikeOutlined, LikeFilled, FormOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime) //实现moment的fromNow功能

const Wrapper = styled.section`
  max-width: 1200px;
  height: calc(100vh - 100px);
  margin: 20px auto 0 auto;
  overflow: auto;
  .zan-area {
    font-family: Impact, sans-serif;
    text-align: center;
    color: #4a4a4a;
    font-size: 14px;
    margin-top: 30px;
    .icon-zan {
      display: block;
      cursor: pointer;
      width: 62px;
      height: 62px;
      border-radius: 50%;
      text-align: center;
      font-size: 40px;
      color: #fff;
      margin: 0 auto 5px;
      overflow: hidden;
      background: linear-gradient(270deg, #2254f4, #406dff);
      box-shadow: 0 12px 30px 0 rgba(34, 84, 244, 0.2);
    }
    .icon-zan:hover {
      background: linear-gradient(270deg, #406dff, #2254f4);
    }
  }
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
  const [artObject, setArtObject] = useState({}) //文章内容
  const [praiseCount, setPraiseCount] = useState(0) //文章内容
  const [artCommentList, setArtCommentList] = useState([]) //评论列表

  const [pageNo, setPageNo] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [count, setCount] = useState(0)

  const [showTextAreaArea, setShowTextAreaArea] = useState('none')
  const [replyItem, setReplyItem] = useState(null)

  const commentRef = useRef()

  const commentLike = (item, i) => {
    commentPraiseFun(item, 1, i)
  }

  const commentDislike = (item, i) => {
    commentPraiseFun(item, 2, i)
  }

  const replyLike = (item, i) => {
    replyPraiseFun(item, 1, i)
  }

  const replyDislike = (item, i) => {
    replyPraiseFun(item, 2, i)
  }

  const handleComment = (i) => {
    $API.article.articleComment({
      artId: match.params.id,
      content:
        commentRef.current && commentRef.current.state
          ? commentRef.current.state.value
          : '',
    }).then(() => {
      commentRef.current.handleReset()
      setShowTextAreaArea('none')
      message.success('评论成功')
      commentListFunQuery()
    })
  }

  const handleReply = (item) => {
    $API.article.commentReply({
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

  const commentListFunQuery = () => {
    $API.article.commentListQuery({
      artId: match.params.id,
      pageNo,
      pageSize,
    }).then((res) => {
      if (res.data && res.data.result) setArtCommentList(res.data.result)
      setCount(res.data.count)
    })
  }

  const handlePraise = () => {
    $API.article.articlePraise({
      artId: match.params.id,
    }).then((res) => {
      setPraiseCount((x) => x + 1)
    })
  }

  const commentPraiseFun = (item, type, i) => {
    $API.article.commentPraise({
      comId: item._id,
      type,
    }).then((res) => {
      document.getElementById('J-comment-praise-count' + i).innerText =
        res.data.praiseCount
      document.getElementById('J-comment-not-praise-count' + i).innerText =
        res.data.notPraiseCount
    })
  }

  const replyPraiseFun = (item, type, i) => {
    $API.article.replyPraise({
      repId: item._id,
      type,
    }).then((res) => {
      document.getElementById('J-reply-praise-count' + i).innerText =
        res.data.praiseCount
      document.getElementById('J-reply-not-praise-count' + i).innerText =
        res.data.notPraiseCount
    })
  }

  useEffect(() => {
    $API.article.articleDetails({
      id: match.params.id,
    }).then((res) => {
      if (res.data) {
        setArtObject(res.data)
        setPraiseCount(res.data.praiseCount)
      }
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

  const commentActions = (item, i, bool) => [
    <Tooltip key={i} title="Like">
      <span onClick={() => commentLike(item, i)}>
        {createElement(LikeFilled)}
        <span id={'J-comment-praise-count' + i} className="comment-action">
          {item.praiseCount}
        </span>
      </span>
    </Tooltip>,
    <Tooltip key={i} title="Dislike">
      <span onClick={() => commentDislike(item, i)}>
        {React.createElement(DislikeOutlined)}
        <span id={'J-comment-not-praise-count' + i} className="comment-action">
          {item.notPraiseCount}
        </span>
      </span>
    </Tooltip>,

    <span key="comment-basic-reply-to">
      <Button
        onClick={() => {
          setShowTextAreaArea('block')
          setReplyItem(item)
        }}
        type="link"
      >
        回复
      </Button>
    </span>,
  ]

  const replyActions = (item, i) => [
    <Tooltip key={i} title="Like">
      <span onClick={() => replyLike(item, i)}>
        {createElement(LikeFilled)}
        <span id={'J-reply-praise-count' + i} className="comment-action">
          {item.praiseCount}
        </span>
      </span>
    </Tooltip>,
    <Tooltip key={i} title="Dislike">
      <span onClick={() => replyDislike(item, i)}>
        {React.createElement(DislikeOutlined)}
        <span id={'J-reply-not-praise-count' + i} className="comment-action">
          {item.notPraiseCount}
        </span>
      </span>
    </Tooltip>,
  ]

  return (
    <Wrapper>
      <Content>{artObject.content}</Content>
      <div className="zan-area">
        <span
          className="iconfont icon-zan"
          onClick={() => handlePraise()}
        ></span>
        {praiseCount}
      </div>
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
      {artCommentList.length > 0 ? (
        artCommentList.map((item, i) => {
          return (
            <Comment
              key={i}
              actions={commentActions(item, i, 1)}
              author={<a>{item.user.userName}</a>}
              avatar={
                <Avatar src={item.user.avatar} alt={item.user.userName} />
              }
              content={<p>{item.content}</p>}
              datetime={
                <Tooltip
                  title={dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                >
                  <span>{dayjs(item.createdAt).fromNow()}</span>
                </Tooltip>
              }
            >
              {item.reply.map((r, k) => {
                return (
                  <Comment
                    key={'reply' + k}
                    actions={replyActions(r, k, 0)}
                    author={<a>{r.user.userName}</a>}
                    avatar={
                      <Avatar src={r.user.avatar} alt={r.user.userName} />
                    }
                    content={<p>{r.content}</p>}
                    datetime={
                      <Tooltip
                        title={dayjs(r.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                      >
                        <span>{dayjs(r.createdAt).fromNow()}</span>
                      </Tooltip>
                    }
                  ></Comment>
                )
              })}
            </Comment>
          )
        })
      ) : (
          <Empty description="暂无评论" imageStyle={{ marginTop: 70 }} />
        )}
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
