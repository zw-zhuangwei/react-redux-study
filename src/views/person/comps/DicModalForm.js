/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react'
import { Form, Input, Modal, Row, Col } from 'antd'

import styled from 'styled-components'

const Wrapper = styled.section``

const Dictionary = ({ visible, handleEdit, handleCancel, data, flag }) => {
  const [form] = Form.useForm()

  const handleOk = () => {
    form.submit()
  }

  const handleSubmit = (v) => {
    handleEdit({ ...data, ...v }, flag)
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
        width={650}
        visible={visible}
        onOk={() => handleOk()}
        onCancel={() => handleCancel(false)}
      >
        <Form
          form={form}
          labelCol={{ span: 7, offset: 0 }}
          name="dictionary"
          initialValues={form}
          onFinish={handleSubmit}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="编码"
                name="code"
                rules={[{ required: true, message: '编码必填' }]}
              >
                <Input disabled={flag === 'insert' ? false : true} placeholder="编码" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="名称"
                name="name"
                rules={[{ required: true, message: '名称必填' }]}
              >
                <Input placeholder="名称" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="图标" name="icon">
                <Input placeholder="图标" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="扩展字段1" name="extend01">
                <Input placeholder="扩展字段1" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="扩展字段2" name="extend02">
                <Input placeholder="扩展字段2" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="扩展字段3" name="extend03">
                <Input placeholder="扩展字段3" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="备注" name="remark">
                <Input.TextArea placeholder="备注" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </Wrapper>
  )
}

export default Dictionary
