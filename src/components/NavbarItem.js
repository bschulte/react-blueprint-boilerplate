import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Row, Col } from 'react-flexbox-grid'
import { Classes, Colors, Icon } from '@blueprintjs/core'
import { PRIMARY_COLOR } from '../data/config'

import history from '../util/history'

const navigate = (path) => {
  history.push(path)
}

class NavbarItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hovered: false
    }

    this.toggleHoverState = this.toggleHoverState.bind(this)
  }

  toggleHoverState() {
    const { hovered } = this.state
    this.setState({ hovered: !hovered })
  }

  render() {
    const { location, route } = this.props
    const { hovered } = this.state
    const navItemStyle = {
      height: '55px',
      color: Colors.WHITE,
      backgroundColor: hovered
        ? PRIMARY_COLOR
        : location.pathname.startsWith(route.path)
        ? Colors.GRAY1
        : '',
      marginRight: 0,
      marginLeft: 0,
      alignItems: 'center',
      paddingLeft: '20px',
      transition: 'background-color 0.2s ease',
      cursor: 'pointer',
      fontSize: '1.2em'
    }

    const iconStyle = {
      color: location.pathname.startsWith(route.path) ? Colors.BLUE4 : '',
      marginRight: '5px'
    }

    return (
      <Row
        style={navItemStyle}
        onMouseEnter={this.toggleHoverState}
        onMouseLeave={this.toggleHoverState}
        onClick={() => navigate(route.path)}
      >
        <Col>
          <Icon icon={route.icon} style={iconStyle} />{' '}
          <span className={Classes.UI_TEXT}>{route.name}</span>
        </Col>
      </Row>
    )
  }
}

export default withRouter(NavbarItem)
