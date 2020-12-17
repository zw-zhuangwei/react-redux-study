import React from 'react'

import styled from 'styled-components'

import {
  ArtList,
  ArtCarousel,
  ActiveUser,
  ArtRecommend,
  ArtDrawer,
} from './comp'

const Wrapper = styled.section`
  &.qz-home {
    width: 1200px;
    height: calc(100vh - 60px);
    display: flex;
    justify-content: space-between;
    overflow: auto;
    background: #f6f6f6;
    margin: 0 auto;
    .qz-home-left {
      width: 49%;
      .qz-carousel {
      }
      .qz-art-list {
      }
    }
    .qz-home-right {
      width: 49%;
      .qz-recommend {
        margin-bottom: 10px;
      }
      .qz-active-user {
      }
    }
  }
`

const Qzhome = ({ route, match }) => {
  return (
    <Wrapper className="qz-home">
      <div className="qz-home-left">
        <ArtCarousel />
        <ArtList />
      </div>
      <div className="qz-home-right">
        <ArtRecommend />
        <ActiveUser />
      </div>
      <ArtDrawer />
    </Wrapper>
  )
}
export default Qzhome
