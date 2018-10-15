import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Row, Col } from 'react-flexbox-grid'

import HeaderBar from '../components/HeaderBar'
import Navbar from '../components/Navbar'

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
    return (
      <div>
        <HeaderBar />
        <Row>
          <Col xs={2} style={{ padding: 0 }}>
            <Navbar />
          </Col>
          <Col style={{ marginTop: '15px', marginLeft: '15px' }}>
            <Switch>
              <Route
                path="/dashboard"
                name="Dashboard"
                component={() => <div>Test</div>}
              />
              <Redirect from="/" to="/dashboard" />
            </Switch>
          </Col>
        </Row>
      </div>
    )
  }
}
