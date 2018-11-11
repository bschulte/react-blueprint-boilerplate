import Dashboard from '../pages/Main/Dashboard'
import SecondPage from '../pages/Main/SecondPage'

export const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    icon: 'dashboard'
  },
  {
    path: '/registration-codes',
    name: 'Registration Codes',
    component: SecondPage,
    icon: 'new-person'
  }
]

export const HOME_ROUTE = '/dashboard'
