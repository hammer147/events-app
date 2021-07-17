import { GetStaticProps } from 'next'
import Head from 'next/head'
import EventList from '../components/events/event-list'
import NewsletterRegistration from '../components/input/newsletter-registration'
import { getFeaturedEvents } from '../helpers/api-util'
import { MeetingEvent } from '../typings'

type Props = {
  featuredEvents: MeetingEvent[]
}

const HomePage = ({ featuredEvents }: Props) => {
  return (
    <div>
      <Head>
        <title>Next.js Events</title>
        <meta name='description' content='Find events about learning Next.js'/>
      </Head>
      <NewsletterRegistration />
      <EventList items={featuredEvents} />
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const featuredEvents = await getFeaturedEvents()
  return {
    props: { featuredEvents },
    revalidate: 1800 // 30 minutes
  }
}

export default HomePage
