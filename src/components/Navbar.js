import React, { Component } from 'react'
import { Colors } from '@blueprintjs/core'

import { routes } from '../data/routes'
import NavbarItem from './NavbarItem'

export default class Navbar extends Component {
  render() {
    return (
      <div
        style={{
          backgroundColor: Colors.DARK_GRAY5,
          height: '92vh'
        }}
      >
        {routes.map((route) => (
          <NavbarItem key={route.path} route={route} />
        ))}
      </div>
    )
  }
}
