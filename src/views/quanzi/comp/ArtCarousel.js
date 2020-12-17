import React from 'react'
import { Carousel } from 'antd'

import styled from 'styled-components'

const Wrapper = styled.section`
  &.qz-carousel {
  }
`

const ArtCarousel = ({ route, match }) => {
  return (
    <Wrapper className="qz-carousel">
      <Carousel autoplay effect="fade">
        <div>
          <h3
            style={{
              height: '250px',
              color: '#fff',
              lineHeight: '160px',
              textAlign: 'center',
              background: '#364d79',
            }}
          >
            1
          </h3>
        </div>
        <div>
          <h3
            style={{
              height: '250px',
              color: '#fff',
              lineHeight: '160px',
              textAlign: 'center',
              background: '#364d79',
            }}
          >
            2
          </h3>
        </div>
        <div>
          <h3
            style={{
              height: '250px',
              color: '#fff',
              lineHeight: '160px',
              textAlign: 'center',
              background: '#364d79',
            }}
          >
            3
          </h3>
        </div>
        <div>
          <h3
            style={{
              height: '250px',
              color: '#fff',
              lineHeight: '160px',
              textAlign: 'center',
              background: '#364d79',
            }}
          >
            4
          </h3>
        </div>
      </Carousel>
    </Wrapper>
  )
}
export default ArtCarousel
