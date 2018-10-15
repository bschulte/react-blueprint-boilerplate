import React from 'react'

export const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => <div>Test</div>,
    icon: 'dashboard'
  },
  {
    path: '/user',
    name: 'User',
    component: () => <div>User</div>,
    icon: 'user'
  }
]

export const HOME_ROUTE = '/dashboard'
