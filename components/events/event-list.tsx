import { MeetingEvent } from '../../typings'
import EventItem from './event-item'
import classes from './event-list.module.css'

type Props = {
  items: MeetingEvent[]
}

const EventList = ({ items }: Props) => {
  return (
    <ul className={classes.list}>
      {items.map(event => <EventItem key={event.id} event={event} />)}
    </ul>
  )
}

export default EventList
