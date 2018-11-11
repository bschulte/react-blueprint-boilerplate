import gql from 'graphql-tag'

export const UPDATE_NOTIFICATION_STATUS = gql`
  mutation updateNotificationStatus(
    $notificationUuid: String!
    $newStatus: String!
  ) {
    updateNotificationStatus(
      notificationUuid: $notificationUuid
      newStatus: $newStatus
    ) {
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
