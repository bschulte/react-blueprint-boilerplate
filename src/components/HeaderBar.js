import React, { Component } from 'react'
import { Colors, H2, Icon } from '@blueprintjs/core'
import { Row, Col } from 'react-flexbox-grid'
import { view } from 'react-easy-state'

import userStore from '../store/userStore'

class HeaderBar extends Component {
  render() {
    const headerStyle = {
      backgroundColor: Colors.WHITE,
      height: '10vh',
      borderBottom: `2px solid ${Colors.BLUE1}`,
      alignItems: 'center'
    }

    return (
      <Row style={headerStyle}>
        <Col xs={2}>
          <H2 style={{ margin: 0 }}>Brand</H2>
        </Col>
        <Col xs={10} style={{ textAlign: 'right' }}>
          <Icon icon="user" intent="primary" /> User:{' '}
          <strong>{userStore.email}</strong>
        </Col>
      </Row>
    )
  }
}

export default view(HeaderBar)
