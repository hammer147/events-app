import { useContext, useEffect, useState } from 'react'
import CommentList from './comment-list'
import NewComment from './new-comment'
import classes from './comments.module.css'
import { EventComment } from '../../typings'
import { NotificationContext } from '../../store/NotificationContext'

type Props = {
  eventId: string
}

const Comments = ({ eventId }: Props) => {

  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState<EventComment[]>([])
  const [isFetchingComments, setIsFetchingComments] = useState(false)
  const notificationCtx = useContext(NotificationContext)

  useEffect(() => {
    if (showComments) {
      setIsFetchingComments(true)
      fetch(`/api/comments/${eventId}`)
        .then(response => response.json())
        .then(data => {
          setComments(data.comments)
          setIsFetchingComments(false)
        })
    }
  }, [showComments])

  const toggleCommentsHandler = () => {
    setShowComments((prevStatus) => !prevStatus)
  }

  const addCommentHandler = (commentData: EventComment) => {

    notificationCtx.showNotification({
      title: 'Sending comment...',
      message: 'Your comment is being saved',
      status: 'pending'
    })

    fetch(`/api/comments/${eventId}`, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if (response.ok) return response.json()
      return response.json().then(data => { throw new Error(data.message || 'Something went wrong...') })
    })
      .then(data => notificationCtx.showNotification({
        title: 'Success!',
        message: 'Successfully saved your comment',
        status: 'success'
      }))
      .catch((err: Error) => {
        notificationCtx.showNotification({
          title: 'Error!',
          message: err.message ?? 'Something went wrong...',
          status: 'error'
        })
      })
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetchingComments && <CommentList items={comments} />}
      {showComments && isFetchingComments && <p>Loading...</p>}
    </section>
  )
}

export default Comments
