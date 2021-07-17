import Image from 'next/image'
import { MeetingEvent } from '../../typings'
import Button from '../ui/button'
import DateIcon from '../icons/date-icon'
import AddressIcon from '../icons/address-icon'
import ArrowRightIcon from '../icons/arrow-right-icon'
import classes from './event-item.module.css'

type Props = {
  event: MeetingEvent
}

const EventItem = ({ event }: Props) => {
  const { title, image, date, location, id } = event
  const formattedDate = new Date(date).toLocaleDateString('en-Us', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
  const formattedAddress = location.replace(', ', '\n')
  const exploreLink = `/events/${id}`

  return (
    <li className={classes.item}>
      <Image src={'/' + image} alt={title} width={440} height={224}/>
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{formattedDate}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Button link={exploreLink}>
            <span>Explore Event</span>
            <span className={classes.icon}><ArrowRightIcon /></span>
          </Button>
        </div>
      </div>
    </li>
  )
}

export default EventItem

/**
 * update 24/5/21: 
 * still not sure, but now I think the width and height should be the actual width and hight of the original image.
 * so the explanation below might just be a pile of bs :-)
 * 
 * 
 * 
 * TO LOOK INTO...EXPLANATION BELOW CORRECT? 
 * WIDTH AND HEIGHT ONLY DETERMINE LOADED IMG SIZE?
 * WHAT ABOUT CSS? USING WIDTH 640PX MESSES THINGS UP...
 * 
 * https://dev.to/yago/understanding-next-image-13ff
 * 
 * The width and height should be more or less the max pixels we need.
 * In our case: 
 * 
 * the images can have largest width on small screens.
 * list max-with is 40 rem (see EventList.module.css) 
 * the image width is 100% (see EventItem.module.css)
 * 40 rem x 16px = 640px
 * 
 * the images have largest height on large screens.
 * the height is always 14 rem (see EventItem.module.css)
 * 14 rem x 16px = 224px
 */