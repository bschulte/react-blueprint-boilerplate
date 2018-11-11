import React, { Component } from 'react'
import {
  Icon,
  Navbar,
  Alignment,
  Popover,
  Position,
  Menu,
  MenuItem,
  Intent,
  Tag
} from '@blueprintjs/core'
import moment from 'moment'
import { Mutation } from 'react-apollo'

import history from '../util/history'
import { deleteToken } from '../util/auth'
import { AppContext } from '../context/appContext'
import GraphQLQuery from './GraphQLQuery'
import { getUserNotifications } from '../data/graphqlQueries'
import UserNotification from './Modals/UserNotification'
import { UPDATE_NOTIFICATION_STATUS } from '../data/graphqlMutations'

class HeaderBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showNotificationModal: false,
      notificationHtml: '',
      notificationTitle: '',
      notificationUuid: ''
    }

    this.renderNotificationsTag = this.renderNotificationsTag.bind(this)
    this.handleNotificationClick = this.handleNotificationClick.bind(this)
    this.handleNotificationDelete = this.handleNotificationDelete.bind(this)
  }

  logout() {
    deleteToken()
    history.push('/login')
  }

  anyUnreadNotifications(notifications) {
    return (
      notifications.filter((notification) => notification.status === 'UNREAD')
        .length > 0
    )
  }

  async handleNotificationClick(
    notificationHtml,
    notificationTitle,
    notificationUuid,
    updateNotificationStatus
  ) {
    console.log('Handling notification click:', notificationUuid)
    updateNotificationStatus({
      variables: { notificationUuid, newStatus: 'READ' }
    })
    this.setState({
      showNotificationModal: true,
      notificationHtml,
      notificationTitle,
      notificationUuid
    })
  }

  async handleNotificationDelete(notificationUuid, updateNotificationStatus) {
    console.log('Handling notification delete')
    this.setState({ showNotificationModal: false })
    updateNotificationStatus({
      variables: { notificationUuid, newStatus: 'DELETED' }
    })
  }

  renderDropdownMenu() {
    return (
      <Menu>
        <MenuItem text="Logout" icon="log-out" onClick={this.logout} />
      </Menu>
    )
  }

  renderNotificationsDropdown(notifications, updateNotificationStatus) {
    return (
      <Menu>
        {notifications.map(({ status, uuid, createdAt, notification }) => {
          const { title: notificationTitle, notificationHtml } = notification
          return (
            <MenuItem
              text={
                <span>
                  {status === 'UNREAD' && (
                    <Icon icon="dot" intent={Intent.DANGER} />
                  )}
                  {notificationTitle}
                </span>
              }
              onClick={() =>
                this.handleNotificationClick(
                  notificationHtml,
                  notificationTitle,
                  uuid,
                  updateNotificationStatus
                )
              }
              key={uuid}
              label={moment(createdAt).format('L')}
            />
          )
        })}
      </Menu>
    )
  }

  renderNotificationsTag({ data }) {
    console.log('Rendering notifications tag')
    const {
      notificationHtml,
      notificationTitle,
      showNotificationModal,
      notificationUuid
    } = this.state
    const { notifications } = data
    // Only show the notification tag if there is any non-deleted notifications that the user has
    return (
      <Mutation mutation={UPDATE_NOTIFICATION_STATUS}>
        {(updateNotificationStatus) => {
          if (
            notifications.filter(
              (notification) => notification.status !== 'DELETED'
            ).length > 0
          ) {
            return (
              <div>
                <UserNotification
                  isOpen={showNotificationModal}
                  notificationHtml={notificationHtml}
                  title={notificationTitle}
                  onClose={() =>
                    this.setState({ showNotificationModal: false })
                  }
                  onDelete={() =>
                    this.handleNotificationDelete(
                      notificationUuid,
                      updateNotificationStatus
                    )
                  }
                />
                <Popover
                  content={this.renderNotificationsDropdown(
                    notifications,
                    updateNotificationStatus
                  )}
                  position={Position.BOTTOM}
                >
                  <div>
                    <Tag
                      className="pointer"
                      intent={
                        this.anyUnreadNotifications(notifications)
                          ? Intent.WARNING
                          : Intent.NONE
                      }
                      icon="notifications"
                    >
                      {notifications.length}
                    </Tag>
                  </div>
                </Popover>
              </div>
            )
          } else {
            return null
          }
        }}
      </Mutation>
    )
  }

  render() {
    const { email } = this.context

    return (
      <Navbar fixedToTop>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>Boilerplate Dashboard</Navbar.Heading>
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT} className="pointer">
          <GraphQLQuery
            query={getUserNotifications}
            component={this.renderNotificationsTag}
          />
          <Navbar.Divider />
          <Popover
            content={this.renderDropdownMenu()}
            position={Position.BOTTOM}
          >
            <div>
              <Icon icon="user" intent="primary" /> <span>{email}</span>
            </div>
          </Popover>
        </Navbar.Group>
      </Navbar>
    )
  }
}

HeaderBar.contextType = AppContext

export default HeaderBar
