/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react'
import { Form, Input, Modal, Row, Col, Select } from 'antd'

import styled from 'styled-components'

const Wrapper = styled.section`
  .ant-modal-body{
    padding: 0;
    padding-right: 50px;
  }
`
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
  }, [data, flag, form])

  return (
    <Wrapper>
      <Modal
        getContainer={false}
        title={flag === 'insert' ? '新增' : '编辑'}
        width={750}
        visible={visible}
        onOk={() => handleOk()}
        onCancel={() => handleCancel(false)}
      >
        <br />

        <Form
          form={form}
          labelCol={{ span: 8, offset: 0 }}
          name="dictionaryItem"
          initialValues={form}
          onFinish={handleSubmit}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="编码">{data.parentCode}</Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="名称">{data.parentName}</Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="子编码"
                name="code"
                rules={[{ required: true, message: '子编码必填' }]}
              >
                <Input disabled={flag === 'insert' ? false : true} placeholder="子编码" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="子名称"
                name="name"
                rules={[{ required: true, message: '子名称必填' }]}
              >
                <Input placeholder="子名称" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
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
            </Col>
            <Col span={12}>
              <Form.Item label="图标" name="icon">
                <Input placeholder="图标" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="扩展字段1" name="icon">
                <Input placeholder="扩展字段1" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="扩展字段2" name="icon">
                <Input placeholder="扩展字段2" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="扩展字段3" name="remark">
                <Input placeholder="扩展字段3" />
              </Form.Item>
            </Col>
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
