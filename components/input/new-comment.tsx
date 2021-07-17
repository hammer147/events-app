import { FormEvent, useRef, useState } from 'react'
import { EventComment } from '../../typings'
import classes from './new-comment.module.css'

type Props = {
  onAddComment: Function
}

const NewComment = (props: Props) => {
  const [isInvalid, setIsInvalid] = useState(false)

  const emailInputRef = useRef<HTMLInputElement>(null)
  const nameInputRef = useRef<HTMLInputElement>(null)
  const commentInputRef = useRef<HTMLTextAreaElement>(null)

  const sendCommentHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const enteredEmail = emailInputRef.current!.value
    const enteredName = nameInputRef.current!.value
    const enteredComment = commentInputRef.current!.value

    if (
      !enteredEmail || enteredEmail.trim() === '' || !enteredEmail.includes('@') ||
      !enteredName || enteredName.trim() === '' ||
      !enteredComment || enteredComment.trim() === ''
    ) {
      setIsInvalid(true)
      return
    }

    const commentData: EventComment = {
      email: enteredEmail,
      name: enteredName,
      text: enteredComment,
    }
    
    props.onAddComment(commentData)
  }

  return (
    <form className={classes.form} onSubmit={sendCommentHandler}>
      <div className={classes.row}>
        <div className={classes.control}>
          <label htmlFor='email'>Your email</label>
          <input type='email' id='email' ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='name'>Your name</label>
          <input type='text' id='name' ref={nameInputRef} />
        </div>
      </div>
      <div className={classes.control}>
        <label htmlFor='comment'>Your comment</label>
        <textarea id='comment' rows={5} ref={commentInputRef}></textarea>
      </div>
      {isInvalid && <p>Please enter a valid email address and comment!</p>}
      <button>Submit</button>
    </form>
  )
}

export default NewComment
