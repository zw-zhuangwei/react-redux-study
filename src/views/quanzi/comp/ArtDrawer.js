import React, { useState } from 'react'
import { Button, Drawer } from 'antd'
import styled from 'styled-components'

import { Chat } from '@components'

const Wrapper = styled.section`
  &.qz-drawer {
    .btn-affix-chat {
      position: fixed;
      right: 10px;
      top: 40%;
    }
  }
`

const ArtDrawer = ({ route, match }) => {
  const [visible, setVisible] = useState(false)

  const _onDrawerClose = () => {
    setVisible(!visible)
  }

  return (
    <Wrapper className="qz-drawer">
      <Button
        type="link"
        className="btn-affix-chat"
        onClick={() => setVisible(!visible)}
      >
        Chat聊天
      </Button>
      <Drawer
        title="聊天框"
        width="350"
        placement="right"
        closable={false}
        onClose={_onDrawerClose}
        visible={visible}
      >
        <Chat />
      </Drawer>
    </Wrapper>
  )
}
export default ArtDrawer
