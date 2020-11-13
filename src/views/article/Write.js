import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Layout, Form, Input, Button, Select, message } from 'antd'
import E from 'wangeditor'
import { LayHeader } from '../../component'
import { articleInsert, articleModify } from '../../api/article'

const { Content } = Layout
const { Option } = Select

let initData = {}

const ArticleWrite = () => {
  const [form] = Form.useForm()
  const [wEditor, setWEditor] = useState(null)

  const history = useHistory()
  const location = useLocation()
  initData = location.state.record
  const onTypeSelect = () => {}

  const initEditor = () => {
    const wEditor = new E('#wEditor')
    wEditor.config.placeholder = '请输入聊天内容...'
    wEditor.config.focus = false
    // wEditor.config.height = 300
    wEditor.config.menus = []
    return wEditor
  }

  const formSubmit = async () => {
    try {
      const v = await form.validateFields()
      articleInsert({
        title: v.title,
        desc: v.desc,
        type: v.type,
        content: wEditor.txt.text(),
      }).then((res) => {
        if (res.code === 200) {
          message.success(res.message)
          history.push(
            `/qzhome/${JSON.parse(localStorage.getItem('userInfo')).uid}`
          )
        } else {
          message.error(res.message)
        }
      })
    } catch (errorInfo) {
      console.log('Failed:', errorInfo)
    }
  }

  const formModify = async () => {
    try {
      const v = await form.validateFields()
      articleModify({
        id: initData._id,
        title: v.title,
        desc: v.desc,
        type: v.type,
        content: wEditor.txt.text(),
      }).then((res) => {
        if (res.code === 200) {
          message.success(res.message)
          history.push(
            `/qzhome/${JSON.parse(localStorage.getItem('userInfo')).uid}`
          )
        } else {
          message.error(res.message)
        }
      })
    } catch (errorInfo) {
      console.log('Failed:', errorInfo)
    }
  }

  useEffect(() => {
    const wEditor = initEditor()
    wEditor.create()
    setWEditor(wEditor)
    wEditor.txt.text(initData.content)
  }, [])

  return (
    <>
      <div className="qz-header">
        <LayHeader />
      </div>
      <Content style={{ padding: '0 50px' }}>
        <Form form={form} layout="horizontal" style={{ marginTop: '20px' }}>
          <Form.Item
            label="标题"
            name="title"
            initialValue={initData.title}
            rules={[{ required: true, message: '请填写标题' }]}
          >
            <Input placeholder="标题" />
          </Form.Item>
          <Form.Item
            label="描述"
            required
            name="desc"
            initialValue={initData.desc}
            rules={[{ required: true, message: '请填写描述' }]}
          >
            <Input.TextArea placeholder="描述" />
          </Form.Item>
          <Form.Item
            name="type"
            label="类型"
            rules={[{ required: true, message: '请选择类型' }]}
          >
            <Select
              placeholder="类型"
              onChange={onTypeSelect}
              allowClear
              style={{ zIndex: 10000 }}
            >
              <Option value="javascript">javascript</Option>
              <Option value="html">html</Option>
              <Option value="css">css</Option>
            </Select>
          </Form.Item>
          <Form.Item label="内容" required name="content">
            <div id="wEditor"></div>
          </Form.Item>
          <Form.Item labelAlign="left">
            {!initData._id ? (
              <Button
                onClick={formSubmit}
                style={{ marginLeft: '48%' }}
                type="primary"
              >
                发布
              </Button>
            ) : (
              <Button
                onClick={formModify}
                style={{ marginLeft: '48%' }}
                type="primary"
              >
                修改
              </Button>
            )}
          </Form.Item>
        </Form>
      </Content>
    </>
  )
}

export default ArticleWrite
