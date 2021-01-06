import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Layout, Table, Space, message, Button, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'

const { confirm } = Modal

const Wrapper = styled.section`
  .ant-btn {
    padding: 0;
  }
`

const { Content } = Layout

const ArticleMyList = () => {
  const [artList, setArtList] = useState([])
  const [pageNo, setPageNo] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [count, setCount] = useState(0)
  const columns = [
    {
      title: '序号',
      width: 40,
      align: 'center',
      render: (text, record, index) => `${index + 1}`,
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: '1',
      width: 90,
      ellipsis: {
        showTitle: false,
      },
    },
    {
      title: '描述',
      dataIndex: 'desc',
      key: '2',
      width: 90,
      ellipsis: {
        showTitle: false,
      },
    },
    {
      title: '内容',
      dataIndex: 'content',
      key: '4',
      width: 90,
      ellipsis: {
        showTitle: false,
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: '3',
      width: 90,
      ellipsis: {
        showTitle: false,
      },
      render: (time) => dayjs(time).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '操作',
      key: '5',
      width: 90,
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/article/details/${record._id}`}>查看</Link>
          <Link to={`/person/article_write?_id=${record._id}`}>修改</Link>
          <Button type="link" onClick={() => handleRemoveArt(text, record)}>
            删除
          </Button>
        </Space>
      ),
    },
  ]

  useEffect(() => {
    $API.article.articleMyList({
      pageNo: pageNo,
      pageSize: pageSize,
    }).then((res) => {
      setArtList(res.data.result)
      setCount(res.data.count)
    })
  }, [pageNo, pageSize])

  const handleInfiniteOnLoad = () => {
    $API.article.articleMyList({
      pageNo: pageNo,
      pageSize: pageSize,
    }).then((res) => {
      setArtList(res.data.result)
      setCount(res.data.count)
    })
  }

  //选择页数改变
  const handlePageChange = (page, size) => {
    setPageNo(page)
  }
  //选择每页数量改变
  const handlePageSizeChange = (current, size) => {
    setPageSize(size)
  }

  //修改文章
  // const handleModifyArt = (text, record) => {
  //   history.push({
  //     pathname: `/person/article_write?name=11`,  //这种方式?后面传值跳转后组件不刷新
  //     parmas: { record },
  //   })
  // }

  //删除文章
  const handleRemoveArt = (text, record) => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: '确定删除此文章么',
      okText: '确定',
      cancelText: '取消',
      onOk () {
        $API.article.articleRemove({
          id: record._id,
        }).then((res) => {
          message.success('删除成功')
          handleInfiniteOnLoad()
        })
      },
    })
  }

  return (
    <Wrapper>
      <Content>
        <Table
          loading={false}
          columns={columns}
          dataSource={artList}
          scroll={{ y: 300 }}
          rowKey={(record) => record._id}
          pagination={
            count !== 0
              ? {
                total: count,
                defaultCurrent: pageNo,
                defaultPageSize: pageSize,
                pageSizeOptions: [10, 20, 50, 100, 200],
                showSizeChanger: true,
                showTotal: (total) => `总共${total}条`,
                onChange: (page, pageSize) =>
                  handlePageChange(page, pageSize),
                onShowSizeChange: (current, pageSize) =>
                  handlePageSizeChange(current, pageSize),
              }
              : false
          }
        />
      </Content>
    </Wrapper>
  )
}

export default ArticleMyList
