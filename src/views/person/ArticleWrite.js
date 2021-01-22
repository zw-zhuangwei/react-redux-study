import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Layout, Form, Input, Button, Select, message } from 'antd'
import qs from 'query-string'
import cookie from 'js-cookie'
import E from 'wangeditor'

const { Content } = Layout
const { Option } = Select

const ArticleWrite = ({ route, match }) => {
  const parmas = qs.parse(window.location.search)
  const history = useHistory()
  const [form] = Form.useForm()
  const [wEditor, setWEditor] = useState({})

  const initEditor = () => {
    const wEditor = new E('#wEditor')
    wEditor.config.placeholder = '请输入聊天内容...'
    wEditor.config.focus = false
    // wEditor.config.height = 300
    wEditor.config.zIndex = 0
    wEditor.config.menus = []
    return wEditor
  }

  useEffect(() => {
    const wEditor = initEditor()
    wEditor.create()
    setWEditor(wEditor)
    if (parmas._id) {
      $API.article.articleDetails({
        id: parmas._id,
      }).then((res) => {
        if (res.data) {
          form.setFieldsValue({ ...res.data })
          wEditor.txt.text(res.data.content)
        }
      })
    } else {
      wEditor.txt.text('')
      form.resetFields() //清空表单
    }
  }, [form, parmas._id])

  const onTypeSelect = () => { }

  const formSubmit = async () => {
    try {
      const v = await form.validateFields()
      $API.article.articleInsert({
        title: v.title,
        desc: v.desc,
        type: v.type,
        content: wEditor.txt.text(),
      }).then((res) => {
        if (res.code === 200) {
          message.success(res.message)
          history.push({
            pathname: `/qzhome/${JSON.parse(cookie.get('userInfo')).uid}`,
          })
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
      $API.article.articleModify({
        id: parmas._id,
        title: v.title,
        desc: v.desc,
        type: v.type,
        content: wEditor.txt.text(),
      }).then((res) => {
        if (res.code === 200) {
          message.success(res.message)
          history.push({
            pathname: `/qzhome/${JSON.parse(cookie.get('userInfo')).uid}`,
          })
        } else {
          message.error(res.message)
        }
      })
    } catch (errorInfo) {
      console.log('Failed:', errorInfo)
    }
  }

  return (
    <>
      <Content style={{ padding: '0 50px' }}>
        <Form
          form={form}
          layout="horizontal"
          style={{ marginTop: '20px' }}
          initialValues={form}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请填写标题' }]}
          >
            <Input placeholder="标题" />
          </Form.Item>
          <Form.Item
            label="描述"
            required
            name="desc"
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
          <Form.Item label="内容" required>
            <div id="wEditor"></div>
          </Form.Item>
          <Form.Item labelAlign="left">
            {!parmas._id ? (
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
