import { createContext, ReactNode, useEffect, useState } from 'react'

type Notification = {
  title: string
  message: string
  status: string
}

type NotificationContext = {
  notification: Notification | null
  showNotification: (notification: Notification) => void
  hideNotification: () => void
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

  const showNotification = (notification: Notification) => setActiveNotification(notification)
  const hideNotification = () => setActiveNotification(null)
  
  const context: NotificationContext = {
    notification: activeNotification,
    showNotification,
    hideNotification
  }

  return (
    <NotificationContext.Provider value={context}>
      {children}
    </NotificationContext.Provider>
  )
}
