/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { Button, Table, Badge, Menu, Dropdown, message, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import styled from 'styled-components'
import { DicModal } from './comps'

const Wrapper = styled.section`
  
`

const menu = (
  <Menu>
    <Menu.Item>Action 1</Menu.Item>
    <Menu.Item>Action 2</Menu.Item>
  </Menu>
);

const Dictionary = () => {
  const [visible, setVisible] = useState(false);

  const expandedRowRender = () => {
    const columns = [
      { title: 'Date', dataIndex: 'date', key: 'date' },
      { title: 'Name', dataIndex: 'name', key: 'name' },
      {
        title: 'Status',
        key: 'state',
        render: () => (
          <span>
            <Badge status="success" />
            Finished
          </span>
        ),
      },
      { title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum' },
      {
        title: 'Action',
        dataIndex: 'operation',
        key: 'operation',
        render: () => (
          <Space size="middle">
            <a>Pause</a>
            <a>Stop</a>
            <Dropdown overlay={menu}>
              <a>
                More <DownOutlined />
              </a>
            </Dropdown>
          </Space>
        ),
      },
    ];

    const data = [];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i,
        date: '2014-12-24 23:12:00',
        name: 'This is production name',
        upgradeNum: 'Upgraded: 56',
      });
    }
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  const columns = [
    { title: '编码', dataIndex: 'code', key: 'code' },
    { title: '名称', dataIndex: 'name', key: 'name' },
    { title: '图标', dataIndex: 'icon', key: 'icon' },
    { title: '等级', dataIndex: 'level', key: 'level' },
    { title: '备注', dataIndex: 'remark', key: 'remark' },
    { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt' },
    { title: '修改时间', dataIndex: 'updatedAt', key: 'updatedAt' },
    {
      title: '操作', key: 'operation', render: () => <>
        <a> 新增 </a>
        <a> 修改 </a>
        <a> 删除 </a>
      </>
    },
  ];

  const data = [];
  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i,
      code: 'Screem',
      name: 'iOS',
      icon: '10.3.4.5654',
      level: 500,
      remark: 'Jack',
      createdAt: '2014-12-24 23:12:00',
      updatedAt: '2014-12-24 23:12:00',
    });
  }

  const handleAdd = () => {
    // $API.person.articleThirdPartyRemove({ id: 1 }).then(() => {
    //   message.success('新增成功')
    // })
    setVisible(true)
  }

  const handleShowHide = () => {
    setVisible(false)
  }

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
        columns={columns}
        expandable={{ expandedRowRender }}
        dataSource={data}
      />

      {/* <Modal
        title="新增"
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={500}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal> */}
      <DicModal visible={visible} handleShowHide={handleShowHide} />
    </Wrapper>
  );
}

export default Dictionary