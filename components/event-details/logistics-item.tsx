import { FC, ReactNode } from 'react'
import classes from './logistics-item.module.css'

type Props = {
  children: ReactNode
  icon: FC
}

const LogisticsItem = ({ children, icon: Icon }: Props) => {
  return (
    <li className={classes.item}>
      <span className={classes.icon}>
        <Icon />
      </span>
      <span className={classes.content}>{children}</span>
    </li>
  )
}

export default LogisticsItem
