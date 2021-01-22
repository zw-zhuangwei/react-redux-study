/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import { Button, Table, message, Drawer, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'

import styled from 'styled-components'
import dayjs from 'dayjs'

import { DicItemModalForm } from '.'

const Wrapper = styled.section`
   width: 100%;
   padding: 15px;
`

const { confirm } = Modal

const DictionaryDrawer = ({ visible, handleClose, data }) => {
  const [dicItemVisible, setDicItemVisible] = useState(false)
  const [dicItemList, setDicItemList] = useState([])
  const [dicItemObj, setDicItemObj] = useState({})
  const [dicItemFlag, setDicItemFlag] = useState('insert')

  const columns = [
    {
      title: '#',
      width: 40,
      align: 'center',
      render: (text, record, index) => `${index + 1}`,
    },
    {
      title: '编码',
      dataIndex: 'parentCode',
      key: 'parentCode',
      width: 150,
      ellipsis: {
        showTitle: false,
      },
    },
    {
      title: '名称',
      dataIndex: 'parentName',
      key: 'parentName',
      width: 150,
      ellipsis: {
        showTitle: false,
      },
    },
    {
      title: '子编码',
      dataIndex: 'code',
      key: 'code',
      width: 120,
      ellipsis: {
        showTitle: false,
      },
    },
    {
      title: '子名称',
      dataIndex: 'name',
      key: 'name',
      width: 150,
      ellipsis: {
        showTitle: false,
      },
    },
    {
      title: '图标', dataIndex: 'icon', key: 'icon', width: 120,
      ellipsis: {
        showTitle: false,
      },
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
      width: 120,
      ellipsis: {
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
      width: 100,
      fixed: 'right',
      render: (text, record) => (
        <>
          <a onClick={() => dictionaryItemModifyBefore(text, record)}> 修改 </a>
          <a onClick={() => dictionaryItemRemove(text, record)}> 删除 </a>
        </>
      ),
    },
  ]
  // 数据字典查询
  const dictionaryItemQuery = (params) => {
    $API.person.dictionaryItemQuery(params).then((res) => {
      setDicItemList(res.data)
      //message.success('查询成功')
    })
  }

  // 数据字典新增前
  const handleItemAdd = () => {
    setDicItemFlag('insert')
    setDicItemObj(
      Object.assign({ parentCode: data.code, parentName: data.name })
    )
    setDicItemVisible(true)
  }

  // 数据字典新增
  const dictionaryItemInsert = (params) => {
    $API.person.dictionaryItemInsert(params).then((res) => {
      setDicItemVisible(false)
      dictionaryItemQuery({
        parentCode: data.code,
        parentName: data.name,
      })
      message.success('新增成功')
    })
  }

  // 数据字典修改前
  const dictionaryItemModifyBefore = (text, record) => {
    setDicItemFlag('update')
    setDicItemObj(record)
    setDicItemVisible(true)
  }

  // 数据字典修改
  const dictionaryItemModify = (v) => {
    $API.person.dictionaryItemModify(v).then((res) => {
      setDicItemVisible(false)
      dictionaryItemQuery({
        parentCode: data.code,
        parentName: data.name,
      })
      message.success('修改成功')
    })
  }

  // 数据字典删除
  const dictionaryItemRemove = (text, record) => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: '确定删除此数据字典明细么',
      okText: '确定',
      cancelText: '取消',
      onOk () {
        $API.person
          .dictionaryItemRemove({
            id: record._id,
          })
          .then((res) => {
            dictionaryItemQuery({
              parentCode: data.code,
              parentName: data.name,
            })
            message.success('删除成功')
          })
      },
    })
  }

  const handleEdit = (v, flag) => {
    if (flag === 'insert') {
      dictionaryItemInsert(Object.assign(dicItemObj, v))
    } else {
      dictionaryItemModify(Object.assign(dicItemObj, v))
    }
  }

  const onClose = () => {
    handleClose(false)
  }

  const handleCancel = (bool) => {
    setDicItemVisible(bool)
  }

  useEffect(() => {
    dictionaryItemQuery({
      parentCode: data.code,
      parentName: data.name,
    })
  }, [data.code, data.name])

  return (
    <>
      <Drawer
        title="数据字典明细"
        width="60%"
        placement="right"
        closable={false}
        onClose={() => onClose()}
        visible={visible}
        key="right"
      >
        <Wrapper>
          <Button
            onClick={handleItemAdd}
            type="primary"
            style={{
              marginBottom: 15,
            }}
          >
            新增
          </Button>
          <Table
            columns={columns}
            rowKey={(record) => record._id}
            dataSource={dicItemList}
            scroll={{ y: 550 }}
            bordered
            pagination={{
              pageSizeOptions: [10, 20, 50, 100, 200],
              showSizeChanger: true,
              showTotal: (total) => `总共${total}条`,
            }}
          />

          <DicItemModalForm
            visible={dicItemVisible}
            flag={dicItemFlag}
            data={dicItemObj}
            handleEdit={handleEdit}
            handleCancel={handleCancel}
          />
        </Wrapper>
      </Drawer>
    </>
  )
}

export default DictionaryDrawer
