import Link from 'next/link'
import { MouseEventHandler, ReactNode } from 'react'
import classes from './button.module.css'

type Props = {
  children: ReactNode
  link?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
}

const Button = ({ children, link, onClick }: Props) => {

  if (link) {
    return (
      <Link href={link}>
        <a className={classes.btn}>{children}</a>
      </Link>
    )
  }

  return (
    <button className={classes.btn} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
