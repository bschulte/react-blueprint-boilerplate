import React, { Component } from 'react'
import { Colors } from '@blueprintjs/core'
import { Col } from 'react-flexbox-grid'

import { routes } from '../data/routes'
import NavbarItem from './NavbarItem'

export default class Navbar extends Component {
  render() {
    return (
      <Col
        xs={2}
        style={{
          backgroundColor: Colors.DARK_GRAY5,
          height: '100vh',
          paddingRight: 0
        }}
      >
        {routes.map((route) => (
          <NavbarItem key={route.path} route={route} />
        ))}
      </Col>
    )
  }
}
