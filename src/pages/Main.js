import React, { Component } from 'react'

import history from '../util/history'
import { checkAuth, deleteToken } from '../util/auth'

export default class Main extends Component {
  async componentDidMount() {
    const userLoggedIn = await checkAuth()
    if (!userLoggedIn) {
      console.log('Logging user out')
      deleteToken()
      history.push('/login')
    }
  }

  render() {
    return <div>Main</div>
  }
}
