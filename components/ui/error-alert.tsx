import { ReactNode } from 'react'
import classes from './error-alert.module.css'

type Props = {
  children: ReactNode
}

const ErrorAlert = ({ children }: Props) => {
  return (
    <div className={classes.alert}>
      {children}
    </div>
  )
}

export default ErrorAlert
