import React from 'react'

import styled from 'styled-components'

import { ArtList, ArtCarousel, ActiveUser, ArtDrawer } from './comp'

const Wrapper = styled.section`
  &.qz-home {
    width: 1200px;
    height: calc(100vh - 60px);
    overflow: auto;
    background: #f6f6f6;
    margin: 0 auto;
  }
`

const Qzhome = ({ route, match }) => {
  return (
    <Wrapper className="qz-home flex">
      <div>
        <ArtCarousel />
        <ArtList />
      </div>
      <ActiveUser />
      <ArtDrawer />
    </Wrapper>
  )
}
export default Qzhome
