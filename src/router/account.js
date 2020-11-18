import asyncLoader from '../utils/loadable'

const Login = asyncLoader(() => import('../views/account/Login'))
const Register = asyncLoader(() => import('../views/account/Register'))

const account = [
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/register',
    component: Register,
  },
]

export default account
