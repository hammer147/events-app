import { FormEvent, useContext, useRef } from 'react'
import { NotificationContext } from '../../store/NotificationContext'
import classes from './newsletter-registration.module.css'

const NewsletterRegistration = () => {

  const emailInputRef = useRef<HTMLInputElement>(null)
  const notificationCtx = useContext(NotificationContext)

  const registrationHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const email = emailInputRef.current!.value

    // we could add client email validation here (the browser does it also)

    notificationCtx.showNotification({
      title: 'Signing up',
      message: 'Registering for newsletter',
      status: 'pending'
    })

    fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      if (response.ok) return response.json()
      return response.json().then(data => { throw new Error(data.message || 'Something went wrong...') })
    })
      .then(data => notificationCtx.showNotification({
        title: 'Success!',
        message: 'Successfully registered for newsletter',
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
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            ref={emailInputRef}
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  )
}

export default NewsletterRegistration
