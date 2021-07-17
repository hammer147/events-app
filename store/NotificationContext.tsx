import { createContext, MouseEventHandler, ReactNode, useEffect, useState } from 'react'

type Notification = {
  title: string
  message: string
  status: string
}

type NotificationContext = {
  notification: Notification | null
  showNotification: (notificationData: Notification) => void
  hideNotification: MouseEventHandler<HTMLDivElement>
}

export const NotificationContext = createContext<NotificationContext>({
  notification: null,
  showNotification: () => { },
  hideNotification: () => { }
})


type Props = {
  children: ReactNode
}

export const NotificationContextProvider = ({ children }: Props) => {

  const [activeNotification, setActiveNotification] = useState<Notification | null>(null)

  useEffect(() => {
    if (activeNotification && (activeNotification.status === 'success' || activeNotification.status === 'error')) {
      const timer = setTimeout(() => setActiveNotification(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [activeNotification])

  const showNotificationHandler = (notificationData: Notification) => {
    setActiveNotification(notificationData)
  }
  const hideNotificationHandler = () => {
    setActiveNotification(null)
  }

  const context: NotificationContext = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler
  }

  return (
    <NotificationContext.Provider value={context}>
      {children}
    </NotificationContext.Provider>
  )
}
