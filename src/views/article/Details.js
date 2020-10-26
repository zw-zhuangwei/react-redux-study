import React, {useState } from 'react';
import { Layout } from 'antd';
import { LayHeader } from "../../component";
import { articleDetails } from "../../api/article";

const { Content } = Layout;

export default () => {
 // const [details,setDetails] = useState({});
  const [content,setContent] = useState('');
  const hrefArr = window.location.href.split('/')

  articleDetails({
    id: hrefArr[hrefArr.length-1]
  }).then(res=>{
    setContent(res.data.content)
  })

  return (
    <>
      <div className="qz-header">
        <LayHeader />
      </div>
      <Content style={{ padding: '0 50px' }} >
        {content}
      </Content>
    </>
    
  );
};

