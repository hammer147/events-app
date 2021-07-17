import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import EventList from '../../components/events/event-list'
import EventsSearch from '../../components/events/events-search'
import { getAllEvents } from '../../helpers/api-util'
import { MeetingEvent } from '../../typings'

type Props = {
  events: MeetingEvent[]
}

const AllEventsPage = ({ events }: Props) => {
  const router = useRouter()

  /**
   * Navigates to the Filtered Events Page
   * @param year First filter
   * @param month Second filter
   */
  const findEventsHandler = (year: string, month: string) => {
    const fullPath = `/events/${year}/${month}`
    router.push(fullPath)
  }

  return (
    <>
      <Head>
        <title>All Events</title>
        <meta name='description' content='Find events about learning Next.js'/>
      </Head>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const events = await getAllEvents()
  return {
    props: { events },
    revalidate: 60
  }
}

export default AllEventsPage
