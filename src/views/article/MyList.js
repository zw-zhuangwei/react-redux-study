import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { Layout, Table, Space, message, Button } from 'antd'
import { LayHeader } from '../../component'
import { articleMyList, articleRemove } from '../../api/article'

const Wrapper = styled.section`
  .ant-btn {
    padding: 0;
  }
`

const { Content } = Layout

const ArticleMyList = () => {
  const history = useHistory()
  const [artList, setArtList] = useState([])
  const [pageNo, setPageNo] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [count, setCount] = useState(0)
  const columns = [
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
      dataIndex: 'createAt',
      key: '3',
      width: 90,
      ellipsis: {
        showTitle: false,
      },
    },
    {
      title: '操作',
      key: '5',
      width: 90,
      render: (text, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleInfiniteOnLoad()}>
            查看
          </Button>
          <Button type="link" onClick={() => handleModifyArt(text, record)}>
            修改
          </Button>
          <Button type="link" onClick={() => handleRemoveArt(text, record)}>
            删除
          </Button>
        </Space>
      ),
    },
  ]

  useEffect(() => {
    articleMyList({
      pageNo: pageNo,
      pageSize: pageSize,
    }).then((res) => {
      setArtList(res.data.result)
      setCount(res.data.count)
    })
  }, [pageNo, pageSize])

  const handleInfiniteOnLoad = () => {
    articleMyList({
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
  const handleModifyArt = (text, record) => {
    history.push({
      pathname: '/article/write',
      state: { record },
    })
  }

  //删除文章
  const handleRemoveArt = (text, record) => {
    articleRemove({
      id: record._id,
    }).then((res) => {
      message.success('删除成功')
      handleInfiniteOnLoad()
    })
  }

  return (
    <Wrapper>
      <div className="qz-header">
        <LayHeader />
      </div>
      <Content>
        <Table
          loading={false}
          columns={columns}
          dataSource={artList}
          scroll={{ y: 300 }}
          rowKey={(record) => record._id}
          pagination={{
            total: count,
            defaultCurrent: pageNo,
            defaultPageSize: pageSize,
            pageSizeOptions: [10, 20, 50, 100, 200],
            showSizeChanger: true,
            showTotal: (total) => `总共${total}条`,
            onChange: (page, pageSize) => handlePageChange(page, pageSize),
            onShowSizeChange: (current, pageSize) =>
              handlePageSizeChange(current, pageSize),
          }}
        />
      </Content>
    </Wrapper>
  )
}

export default ArticleMyList
