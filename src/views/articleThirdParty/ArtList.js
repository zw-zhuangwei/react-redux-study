/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useRef } from 'react'
import { Table, Input, Button, Popconfirm, Form, message } from 'antd'
import styled from 'styled-components'

import {
  articleThirdPartyQuery,
  articleThirdPartyInsert,
  articleThirdPartyModify,
  articleThirdPartyRemove,
} from '@api/articleThirdParty'

const Wrapper = styled.section`
  .editable-cell-value-wrap {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: keep-all;
  }
`

const EditableContext = React.createContext()

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm()
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  )
}

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const inputRef = useRef()
  const form = useContext(EditableContext)

  const save = async (e) => {
    try {
      if (record.flag === 'update') {
        handleSave({
          ...record,
          ...{
            title: document.getElementById('J-input-title').value,
            author: document.getElementById('J-input-author').value,
            desc: document.getElementById('J-input-desc').value,
            path: document.getElementById('J-input-path').value,
          },
        })
      } else if (record.flag === 'add') {
        const values = await form.validateFields()
        handleSave({ ...record, ...values })
      }
    } catch (errInfo) {
      console.log('Save failed:', errInfo)
    }
  }

  let childNode = children

  if (editable) {
    childNode =
      record.flag === 'add' || record.flag === 'update' ? ( //key 仅仅做新增用
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
        >
          <Input
            id={'J-input-' + dataIndex}
            placeholder={
              dataIndex === 'title'
                ? '标题'
                : dataIndex === 'author'
                ? '作者'
                : dataIndex === 'desc'
                ? '描述'
                : dataIndex === 'path'
                ? '地址'
                : ''
            }
            defaultValue={
              dataIndex === 'title'
                ? record.title
                : dataIndex === 'author'
                ? record.author
                : dataIndex === 'desc'
                ? record.desc
                : dataIndex === 'path'
                ? record.path
                : ''
            }
            ref={inputRef}
            onPressEnter={save}
          />
        </Form.Item>
      ) : (
        <div className="editable-cell-value-wrap">{children}</div>
      )
  }

  return <td {...restProps}>{childNode}</td>
}

class ArtThirdParty extends React.Component {
  constructor(props) {
    super(props)
    this.columns = [
      {
        title: '#',
        width: 50,
        align: 'center',
        onCell: () => ({
          style: {
            whiteSpace: 'nowrap',
            maxWidth: 100,
          },
        }),
        render: (text, record, index) => `${index + 1}`,
      },
      {
        title: '标题',
        dataIndex: 'title',
        editable: true,
        placeholder: '请输入标题',
        ellipsis: {
          showTitle: false,
        },
      },
      {
        title: '描述',
        dataIndex: 'desc',
        editable: true,
      },
      {
        title: '地址',
        dataIndex: 'path',
        editable: true,
        ellipsis: {
          showTitle: false,
        },
      },
      {
        title: '作者',
        dataIndex: 'author',
        editable: true,
        placeholder: '请输入作者',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (text, record) =>
          this.state.dataSource.length >= 1 ? (
            <>
              <a onClick={() => this.handleModify(record)}> 编辑 </a>

              <Popconfirm
                title="确定去删除?"
                onConfirm={() => this.handleDelete(record)}
              >
                <a> 删除 </a>
              </Popconfirm>
            </>
          ) : null,
      },
    ]
    this.state = {
      dataSource: [],
    }
  }

  handleModify = (record) => {
    const { dataSource } = this.state
    record.flag = 'update'
    // dataSource.some((item, i) => {
    //   if (record._id === item._id) {
    //     dataSource[i] = record
    //     return true
    //   }
    // })
    this.setState({
      dataSource: [...dataSource],
    })
  }
  handleDelete = (record) => {
    if (record._id) {
      this.articleThirdPartyFunRemove(record)
    } else {
      const dataSource = [...this.state.dataSource]
      dataSource.splice(dataSource.indexOf(record.key), 1)
      this.setState({
        dataSource: dataSource,
      })
    }
  }
  handleAdd = () => {
    const { dataSource } = this.state
    const newData = {
      key: new Date().getTime(),
      flag: 'add',
      title: '',
      author: '',
      desc: '',
      path: '',
    }
    this.setState({
      dataSource: [newData, ...dataSource],
    })
  }
  handleSave = (record) => {
    if (record._id) {
      this.articleThirdPartyFunModify(record)
    } else {
      this.articleThirdPartyFunInsert(record)
    }
  }

  articleThirdPartyFunQuery = () => {
    articleThirdPartyQuery().then((res) => {
      this.setState({
        dataSource: res.data,
      })
    })
  }

  articleThirdPartyFunRemove = (record) => {
    articleThirdPartyRemove({ id: record._id }).then(() => {
      message.success('删除成功')
      this.articleThirdPartyFunQuery()
    })
  }

  articleThirdPartyFunInsert = (record) => {
    articleThirdPartyInsert(record).then(() => {
      message.success('新增成功')
      this.articleThirdPartyFunQuery()
    })
  }

  articleThirdPartyFunModify = (record) => {
    articleThirdPartyModify(record).then(() => {
      message.success('修改成功')
      this.articleThirdPartyFunQuery()
    })
  }

  componentDidMount() {
    this.articleThirdPartyFunQuery()
  }

  render() {
    const { dataSource } = this.state
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    }
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col
      }

      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      }
    })
    return (
      <Wrapper>
        <Button
          onClick={this.handleAdd}
          type="primary"
          style={{
            marginBottom: 15,
          }}
        >
          新增
        </Button>
        <Button
          onClick={this.articleThirdPartyFunQuery}
          type="primary"
          style={{
            marginBottom: 15,
            marginLeft: 15,
          }}
        >
          查询
        </Button>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
          scroll={{ y: 350 }}
          pagination={{
            pageSizeOptions: [10, 20, 50, 100, 200],
            showSizeChanger: true,
            showTotal: (total) => `总共${total}条`,
          }}
        />
      </Wrapper>
    )
  }
}

export default ArtThirdParty
