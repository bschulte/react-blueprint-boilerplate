import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import { Login, Main } from './pages'

import { AppContext } from './context/appContext'

// Blueprint styling
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css'
import '@blueprintjs/select/lib/css/blueprint-select.css'
// React tables styling
import 'react-table/react-table.css'

// Global CSS overrides
import './styles/global.scss'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      setEmail: this.setEmail.bind(this)
    }
  }

  setEmail(email) {
    this.setState({ email })
  }

  render() {
    return (
      <AppContext.Provider value={this.state}>
        <Router>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/" component={Main} />
          </Switch>
        </Router>
      </AppContext.Provider>
    )
  }
}

export default App
