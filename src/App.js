import React, { Component } from 'react'
import { Router, Route, Switch } from 'react-router-dom'

import history from './util/history'
import { Login, Main } from './pages'

// Blueprint styling
import '@blueprintjs/core/lib/css/blueprint.css'
// Global CSS overrides
import './styles/global.scss'

class App extends Component {
  render() {
    return (
      <div style={{ width: '100%' }}>
        <Router history={history}>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/" component={Main} />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App
