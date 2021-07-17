import { EventComment } from '../../typings'
import classes from './comment-list.module.css'

type Props = {
  items: EventComment[]
}

const CommentList = ({ items }: Props) => {
  return (
    <ul className={classes.comments}>
      {items.map(comment => <li key={comment._id}>
        <p>{comment.text}</p>
        <div>
          By <address>{comment.name}</address>
        </div>
      </li>)}
    </ul>
  )
}

export default CommentList
