import { renderRoutes } from 'react-router-config'
import { LayHeader } from '@components'

const LayHome = ({ route }) => {
  return (
    <>
      <LayHeader />
      {renderRoutes(route.routes, {
        someProp: 'these extra props are optional12121',
      })}
    </>
  )
}

export default LayHome
