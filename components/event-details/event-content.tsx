import { ReactNode } from 'react'
import classes from './event-content.module.css'

type Props = {
  children: ReactNode
}

const EventContent = ({ children }: Props) => {
  return (
    <section className={classes.content}>
      {children}
    </section>
  )
}

export default EventContent
