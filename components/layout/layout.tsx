import { ReactNode, useContext } from 'react'
import MainHeader from './main-header'
import Notification from '../ui/notification'
import { NotificationContext } from '../../store/NotificationContext'

type Props = {
  children: ReactNode
}

const Layout = ({ children }: Props) => {

  const notificationCtx = useContext(NotificationContext)
  const activeNotification = notificationCtx.notification

  return (
    <>
      <MainHeader />
      <main>{children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </>
  )
}

export default Layout
