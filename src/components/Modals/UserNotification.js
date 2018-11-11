import React from 'react'
import { Dialog, Classes, Button, Intent } from '@blueprintjs/core'

export default function UserNotification({
  notificationHtml,
  title,
  isOpen,
  onDelete,
  onClose
}) {
  return (
    <Dialog isOpen={isOpen} canEscapeKeyClose canOutsideClickClose>
      <div className={Classes.DIALOG_HEADER}>{title}</div>
      <div
        className={Classes.DIALOG_BODY}
        dangerouslySetInnerHTML={{ __html: notificationHtml }}
      />
      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button intent={Intent.DANGER} onClick={onDelete}>
            Delete
          </Button>
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </Dialog>
  )
}
