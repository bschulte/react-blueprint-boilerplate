import React, { Component } from 'react'
import { Row, Col } from 'react-flexbox-grid'
import {
  Intent,
  Divider,
  Button,
  H1,
  Card,
  FormGroup,
  InputGroup
} from '@blueprintjs/core'

import { AppToaster } from '../components/AppToaster'

import { setToken } from '../util/auth'
import { post } from '../util/networking'
import { validateEmail } from '../util/helpers'
import { AppContext } from '../context/appContext'

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      emailValid: false,
      emailFocused: false
    }

    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleEmailFocus = this.handleEmailFocus.bind(this)
  }

  handleEmailChange(e) {
    this.setState({
      email: e.target.value,
      emailValid: validateEmail(e.target.value)
    })
  }

  handleEmailFocus() {
    this.setState({ emailFocused: true })
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value })
  }

  async handleLogin() {
    const { history } = this.props
    const { email, password } = this.state
    console.log('context:', this.context)

    // Check that both email and password are not empty
    if (!email || !password) {
      console.error('Either email or password empty!')
      AppToaster.show({
        icon: 'warning-sign',
        message: 'Either email or password is empty',
        intent: Intent.WARNING
      })
    }

    const response = await post('/users/login', { email, password })
    if (response.status === 200) {
      setToken(response.data.token)
      this.context.setEmail(email)

      history.push('/')
    }
  }

  render() {
    const { emailValid, emailFocused, email, password } = this.state
    console.log('Context in render:', this.context)
    return (
      <Row center="xs" style={{ marginTop: '20vh' }}>
        <Col xs={4}>
          <Card elevation={1}>
            <H1>Boilerplate Portal</H1>
            <FormGroup>
              <Row>
                <Col xs={12}>
                  <InputGroup
                    id="email-input"
                    placeholder="Email"
                    leftIcon="user"
                    onChange={this.handleEmailChange}
                    onFocus={this.handleEmailFocus}
                    intent={
                      emailFocused && !emailValid ? Intent.DANGER : Intent.NONE
                    }
                  />
                </Col>
              </Row>
              <Row style={{ marginTop: '15px' }}>
                <Col xs={12}>
                  <InputGroup
                    id="password-input"
                    placeholder="Password"
                    leftIcon="lock"
                    type="password"
                    onChange={this.handlePasswordChange}
                  />
                </Col>
              </Row>
              <Divider style={{ margin: '15px' }} />
              <Row>
                <Col xs={12}>
                  <Button
                    fill
                    intent={Intent.PRIMARY}
                    onClick={this.handleLogin}
                    disabled={!(email && password && emailValid)}
                  >
                    <strong>LOGIN</strong>
                  </Button>
                </Col>
              </Row>
            </FormGroup>
          </Card>
        </Col>
      </Row>
    )
  }
}

Login.contextType = AppContext

export default Login
