import React, { Component } from 'react'

import { checkAuth } from '../util/auth'

export default class Main extends Component {
  async componentDidMount() {
    await checkAuth()
  }

  render() {
    return <div>Main</div>
  }
}
