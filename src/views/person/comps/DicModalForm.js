/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react'
import { Form, Input, Modal, Select } from 'antd'

import styled from 'styled-components'

const Wrapper = styled.section``

const { Option } = Select

const Dictionary = ({ visible, handleEdit, handleCancel, data, flag }) => {
  const [form] = Form.useForm()

  const handleOk = () => {
    form.submit()
  }

  const handleSubmit = (v) => {
    handleEdit(v, flag)
  }

  useEffect(() => {
    if (flag === 'insert') {
      form.resetFields()
    } else {
      form.setFieldsValue(data)
    }
  }, [data, flag, form]);

  return (
    <Wrapper>
      <Modal
        getContainer={false}
        title={flag === 'insert' ? '新增' : '编辑'}
        width={450}
        visible={visible}
        onOk={() => handleOk()}
        onCancel={() => handleCancel(false)}
      >
        <Form
          form={form}
          labelCol={{ span: 3, offset: 0 }}
          name="dictionary"
          initialValues={form}
          onFinish={handleSubmit}>
          <Form.Item
            label="编码"
            name="code"
            rules={[{ required: true, message: '编码必填' }]}
          >
            <Input disabled={flag === 'insert' ? false : true} placeholder="编码" />
          </Form.Item>
          <Form.Item
            label="名称"
            name="name"
            rules={[{ required: true, message: '名称必填' }]}
          >
            <Input placeholder="名称" />
          </Form.Item>

          <Form.Item
            label="等级"
            name="level"
            rules={[{ required: true, message: '等级必填' }]}
          >
            <Select>
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="3">3</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="图标"
            name="icon"
          >
            <Input placeholder="图标" />
          </Form.Item>
          <Form.Item
            label="备注"
            name="remark"
          >
            <Input.TextArea placeholder="备注" />
          </Form.Item>
        </Form>
      </Modal>
    </Wrapper>
  )
}

export default Dictionary
