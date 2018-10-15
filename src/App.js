import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import { Login } from './pages'

// Blueprint styling
import '@blueprintjs/core/lib/css/blueprint.css'
// Global CSS overrides
import './styles/global.scss'

class App extends Component {
  render() {
    return (
      <div style={{ width: '100%' }}>
        <Router>
          <Route path="/login" component={Login} />
        </Router>
      </div>
    )
  }
}

export default App
