import { renderRoutes } from 'react-router-config'
import { LayHeader, LayLeftBar } from '@components'

const LayHome = ({ route }) => {
  return (
    <>
      <LayHeader />
      <div style={{ display: 'flex' }}>
        <LayLeftBar />
        {renderRoutes(route.routes, {
          someProp: 'these extra props are optional12121',
        })}
      </div>
    </>
  )
}

export default LayHome
