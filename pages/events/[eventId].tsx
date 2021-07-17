import EventSummary from '../../components/event-details/event-summary'
import EventLogistics from '../../components/event-details/event-logistics'
import EventContent from '../../components/event-details/event-content'
import Comments from '../../components/input/comments'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { MeetingEvent } from '../../typings'
import { getEventById, getFeaturedEvents } from '../../helpers/api-util'

type Props = {
  event: MeetingEvent
}

const EventDetailPage = ({ event }: Props) => {

  return (
    <>
      <Head>
        <title>{event.title}</title>
        <meta name='description' content={event.description}/>
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent><p>{event.description}</p></EventContent>
      <Comments eventId={event.id}/>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const eventId = context.params!.eventId
  const event = await getEventById(eventId as string) // todo: what if no event found for the id? see notFound or redirect...
  // console.log(event)
  return {
    props: { event },
    revalidate: 30 // 30 seconds
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const events = await getFeaturedEvents()
  const paths = events.map(event => ({ params: { eventId: event.id } }))
  return {
    paths,
    fallback: 'blocking' // what happens with other paths 
  }
}

export default EventDetailPage
