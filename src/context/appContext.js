import React from 'react'

const state = {
  email: '',
  setEmail: () => {}
}

export const AppContext = React.createContext(state)
