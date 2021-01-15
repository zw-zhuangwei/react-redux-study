/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import { Button, Table, message } from 'antd'
// import { ExclamationCircleOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'

import styled from 'styled-components'
import { DicModalForm, DicModalDrawer } from './comps'

const Wrapper = styled.section`
  width: 100%;
`

// const { confirm } = Modal

const Dictionary = () => {
  const [visible, setVisible] = useState(false)
  const [dicList, setDicList] = useState([])
  const [dicObj, setDicObj] = useState({})
  const [dicFlag, setDicFlag] = useState('insert')

  const [drawerVisible, setDrawerVisible] = useState(false)

  const columns = [
    {
      title: '#',
      width: 40,
      align: 'center',
      key: '#',
      render: (text, record, index) => `${index + 1}`,
    },
    {
      title: '编码', dataIndex: 'code', key: 'code', width: 100, ellipsis: {
        showTitle: false,
      },
    },
    {
      title: '名称', dataIndex: 'name', key: 'name', width: 100, ellipsis: {
        showTitle: false,
      },
    },
    {
      title: '图标', dataIndex: 'icon', key: 'icon', width: 90, ellipsis: {
        showTitle: false,
      },
    },
    {
      title: '备注', dataIndex: 'remark', key: 'remark', width: 120, ellipsis: {
        showTitle: false,
      },
    },
    {
      title: '扩展字段1',
      dataIndex: 'extend01',
      key: 'extend01',
      width: 100,
      ellipsis: {
        showTitle: false,
      },
    },
    {
      title: '扩展字段2',
      dataIndex: 'extend02',
      key: 'extend02',
      width: 100,
      ellipsis: {
        showTitle: false,
      },
    },
    {
      title: '扩展字段3',
      dataIndex: 'extend03',
      key: 'extend03',
      width: 100,
      ellipsis: {
        showTitle: false,
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 180,
      ellipsis: {
        showTitle: false,
      },
      render: (time) => dayjs(time).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '修改时间',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: 180,
      ellipsis: {
        showTitle: false,
      },
      render: (time) => dayjs(time).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '操作',
      key: 'operation',
      width: 150,
      fixed: 'right',
      render: (text, record) => (
        <>
          <a onClick={() => dictionaryItemLook(text, record)}> 查看 </a>
          <a onClick={() => dictionaryModifyBefore(text, record)}> 修改 </a>
          {/* <a onClick={() => dictionaryRemove(text, record)}> 删除 </a> */}
        </>
      ),
    },
  ]

  // 数据字典查询
  const dictionaryEnumMap = () => {
    $API.person.dictionaryEnumMap().then((res) => {
      console.log(res)
    })
  }

  // 数据字典查询
  const dictionaryQuery = () => {
    $API.person.dictionaryQuery().then((res) => {
      setDicList(res.data)
      //message.success('查询成功')
    })
  }

  // 数据字典新增前
  const handleAdd = () => {
    setDicFlag('insert')
    setDicObj({})
    setVisible(true)
  }

  // 数据字典新增
  const dictionaryInsert = (v) => {
    $API.person.dictionaryInsert(v).then((res) => {
      setVisible(false)
      dictionaryQuery()
      message.success('新增成功')
    })
  }

  // 数据字典修改前
  const dictionaryModifyBefore = (text, record) => {
    setDicFlag('update')
    setDicObj(record)
    setVisible(true)
  }

  // 数据字典修改
  const dictionaryModify = (v) => {
    $API.person.dictionaryModify(v).then((res) => {
      setVisible(false)
      dictionaryQuery()
      message.success('修改成功')
    })
  }

  // 数据字典删除
  // const dictionaryRemove = (text, record) => {
  //   confirm({
  //     icon: <ExclamationCircleOutlined />,
  //     content: '确定删除此数据字典么',
  //     okText: '确定',
  //     cancelText: '取消',
  //     onOk () {
  //       $API.person
  //         .dictionaryRemove({
  //           id: record._id,
  //         })
  //         .then((res) => {
  //           dictionaryQuery()
  //           message.success('删除成功')
  //         })
  //     },
  //   })
  // }

  const handleEdit = (v, flag) => {
    if (flag === 'insert') {
      dictionaryInsert(v)
    } else {
      dictionaryModify(v)
    }
  }

  const dictionaryItemLook = (text, record) => {
    setDicObj(record)
    setDrawerVisible(true)
  }

  const handleCancel = (bool) => {
    setVisible(bool)
  }

  const drawerClose = (bool) => {
    setDrawerVisible(bool)
  }

  useEffect(() => {
    dictionaryQuery()
    dictionaryEnumMap()
  }, [])

  return (
    <Wrapper>
      <Button
        onClick={handleAdd}
        type="primary"
        style={{
          marginBottom: 15,
        }}
      >
        新增
      </Button>
      <Table
        rowKey={(record) => record._id}
        columns={columns}
        dataSource={dicList}
        scroll={{ y: 550 }}
        bordered
        pagination={{
          pageSizeOptions: [10, 20, 50, 100, 200],
          showSizeChanger: true,
          showTotal: (total) => `总共${total}条`,
        }}
      />

      {visible ?
        <DicModalForm
          visible={visible}
          flag={dicFlag}
          data={dicObj}
          handleEdit={handleEdit}
          handleCancel={handleCancel}
        /> : void 0}


      {drawerVisible ?
        <DicModalDrawer
          visible={drawerVisible}
          handleClose={drawerClose}
          data={dicObj}
        /> : void 0}
    </Wrapper>
  )
}

export default Dictionary
