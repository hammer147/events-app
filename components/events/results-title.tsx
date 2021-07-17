import Button from '../ui/button'
import classes from './results-title.module.css'

type Props = {
  date: Date
}

const ResultsTitle = ({ date }: Props) => {

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })

  return (
    <section className={classes.title}>
      <h1>Events in {formattedDate}</h1>
      <Button link='/events'>Show all events</Button>
    </section>
  )
}

export default ResultsTitle
