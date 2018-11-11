import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Row, Col } from 'react-flexbox-grid'
import { ApolloProvider } from 'react-apollo'

import HeaderBar from '../components/HeaderBar'
import Navbar from '../components/Navbar'

import { apolloClient } from '../util/graphql'
import history from '../util/history'
import { checkAuth, deleteToken } from '../util/auth'

import { routes } from '../data/routes'
import { NAVBAR_HEIGHT } from '../data/config'
import { AppContext } from '../context/appContext'

class Main extends Component {
  async componentDidMount() {
    const userInfo = await checkAuth()
    if (!userInfo) {
      console.log('Logging user out')
      deleteToken()
      history.push('/login')
    }

    this.context.setEmail(userInfo.email)
  }

  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <HeaderBar />
        <Row style={{ paddingTop: NAVBAR_HEIGHT }}>
          <Navbar />
          <Col xs={10} style={{ marginTop: '10px' }}>
            <Switch>
              {routes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  name={route.name}
                  component={route.component}
                />
              ))}
              <Redirect from="/" to="/dashboard" />
            </Switch>
          </Col>
        </Row>
      </ApolloProvider>
    )
  }
}

Main.contextType = AppContext

export default Main
