import React, { Component } from "react";
import { connect } from "react-redux";
import { Button,Drawer,List, Avatar, Space } from "antd";
import { MessageOutlined, LikeOutlined, FolderViewOutlined } from '@ant-design/icons';
import styled from "styled-components";

import { LayHeader, Chat } from "../../component";

const Wrapper = styled.section`
  &.qz-home {
    .qz-container {
      width: 1200px;
      height: calc(100vh - 60px);
      overflow: auto;
      background: #eee;
      margin: 0 auto;
    }
  }
  .btn-affix-chat{
    position: fixed;
    right: 10px;
    top: 40%;
  }
`;

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'https://ant.design',
    title: `ant design part ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}

class Qzhome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      listData
    };
  }

  _onDrawerClose = ()=>{
    const { visible } = this.state;
    this.setState({
      visible: !visible
    })
  }

  render() {
    const { listData,visible } = this.state;
    return (
      <Wrapper className="qz-home">
        <div className="qz-header">
          <LayHeader history={this.props.history} />
        </div>

        <div className="qz-container">
        <List
            itemLayout="vertical"
            size="large"
            dataSource={listData}
            renderItem={item => (
                <List.Item
                  key={item.title}
                  actions={[
                    <IconText icon={FolderViewOutlined} text="156" key="list-vertical-star-o" />,
                    <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                    <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={<a href={item.href}>{item.title}</a>}
                    description={item.description}
                  />
                  {item.content}
                </List.Item>
            )}
          />
        </div>

        <Button type="link" className="btn-affix-chat" onClick={()=>this.setState({
          visible: !visible
        })}>Chat聊天</Button>
     
        <Drawer
          title="聊天框"
          width="350"
          placement="right"
          closable={false}
          onClose={this._onDrawerClose}
          visible={visible}
        >
          <Chat /> 
        </Drawer>

      </Wrapper>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    count: state.counter.count,
  };
};

// Connected Component
export default connect(mapStateToProps)(Qzhome);
