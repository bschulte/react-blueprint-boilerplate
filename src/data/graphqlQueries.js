import gql from 'graphql-tag'

export const getUserNotifications = gql`
  {
    notifications {
      id
      status
      createdAt
      uuid
      notification {
        id
        notificationHtml
        title
      }
    }
  }
`
