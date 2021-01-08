import { renderRoutes } from 'react-router-config'
import { LayHeader, LayLeftBar } from '@components'
import styled from 'styled-components'

const Wrapper = styled.section`
  .person-area{
    display: flex;
    flex: 1;
    .person-left{
      flex: 0 0 15%;
      max-width: 15%;
      height: calc(100vh);
    }
    .person-right{
      flex: 0 0 85%;
      max-width: 85%;
      padding: 10px;
    }
  }
`

const LayHome = ({ route }) => {
  return (
    <Wrapper>
      <LayHeader />
      <div className="person-area">
        <div className="person-left">
          <LayLeftBar />
        </div>
        <div className="person-right">
          {renderRoutes(route.routes, {
            someProp: 'someProp',
          })}
        </div>
      </div>
    </Wrapper>
  )
}

export default LayHome
