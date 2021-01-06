/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Form, Input, Modal } from 'antd'

import styled from 'styled-components'

const Wrapper = styled.section``

const Dictionary = ({ visible, handleShowHide }) => {

  return (
    <Wrapper>
      <Modal
        title="新增"
        width={780}
        visible={visible}
        onCancel={() => handleShowHide(false)}
      >
        <Form name="basic" layout="inline">
          <Form.Item
            label="编码"
            name="code"
            rules={[{ required: true, message: '编码必填' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="名称"
            name="code"
            rules={[{ required: true, message: '名称必填' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="等级"
            name="code"
            rules={[{ required: true, message: '名称必填' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            style={{ marginTop: 10 }}
            label="图标"
            name="code"
            rules={[{ required: true, message: '名称必填' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            style={{ marginTop: 10 }}
            label="备注"
            name="code"
            rules={[{ required: true, message: '名称必填' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Wrapper>
  )
}

export default Dictionary
