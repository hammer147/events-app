import Button from '../../components/ui/button'
import EventList from '../../components/events/event-list'
import ResultsTitle from '../../components/events/results-title'
import ErrorAlert from '../../components/ui/error-alert'
import { GetServerSideProps } from 'next'
import { DateFilter, MeetingEvent, MeetingEventDetails } from '../../typings'
import { getFilteredEvents } from '../../helpers/api-util'
import Head from 'next/head'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { useEffect, useState } from 'react'



// // Option 1: Client Side data fetching (useSWR)
// // ============================================

// const FilteredEventsPage = () => {
//   const [events, setEvents] = useState<MeetingEvent[]>([])
//   const [dateFilter, setDateFilter] = useState<DateFilter>({ year: 0, month: 0 })
//   const [url, setUrl] = useState<string>('')

//   const router = useRouter()
//   const { slug } = router.query // runs twice, 1st time slug is undefined

//   useEffect(() => {
//     if (slug) {
//       const year = +slug[0]
//       const month = +slug[1]
//       if (!(
//         isNaN(year) || isNaN(month) ||
//         year < 2021 || year > 2030 ||
//         month < 1 || month > 12
//       )) {
//         setDateFilter({ year, month })
//       }
//     }
//   }, [slug])

//   useEffect(() => {
//     if (dateFilter) {
//       const startAt = `${dateFilter.year}-${dateFilter.month.toString().padStart(2, '0')}-01`
//       const endAt = `${dateFilter.year}-${dateFilter.month.toString().padStart(2, '0')}-${new Date(dateFilter.year, dateFilter.month - 1, 0).getDate()}`
//       setUrl(`https://nextjs-course-6da79-default-rtdb.firebaseio.com/events.json?orderBy="date"&startAt="${startAt}"&endAt="${endAt}"`)
//     }
//   }, [dateFilter])

//   const { data, error } = useSWR<Record<string, MeetingEventDetails>, Error>(url)

//   useEffect(() => {
//     if (data) {
//       const events: MeetingEvent[] = []
//       for (const key in data) {
//         events.push({ id: key, ...data[key] })
//       }
//       setEvents(events)
//     }
//   }, [data])

//   if (!data) return <p className='center'>Loading...</p>
//   if (error) return (
//     <>
//       <ErrorAlert>
//         <p>Failed to load...</p>
//       </ErrorAlert>
//       <div className="center">
//         <Button link="/events">Show All Events</Button>
//       </div>
//     </>
//   )
//   if (!events.length) {
//     return (
//       <>
//         <ErrorAlert>
//           <p>No Events Found</p>
//         </ErrorAlert>
//         <div className="center">
//           <Button link="/events">Show All Events</Button>
//         </div>
//       </>
//     )
//   }

//   const date = new Date(dateFilter.year, dateFilter.month - 1) // -1 because months are 0-based

//   return (
//     <>
//       <ResultsTitle date={date} />
//       <EventList items={events} />
//     </>
//   )
// }



// Option 2: Server Side Rendering (getServerSideProps)
// ====================================================

type Props = {
  hasError: true
} | {
  events: MeetingEvent[]
  dateFilter: DateFilter
}

const FilteredEventsPage = (props: Props) => {

  let head = (
    <Head>
      <title>Filtered Events</title>
      <meta name="description" content="A list of filtered Events" />
    </Head>
  )

  if ('hasError' in props) {
    return (
      <>
        {head}
        <ErrorAlert>
          <p>Invalid Filter</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    )
  }

  const { events, dateFilter } = props

  if (!events.length) {
    return (
      <>
        {head}
        <ErrorAlert>
          <p>No Events Found</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    )
  }

  const date = new Date(dateFilter.year, dateFilter.month - 1) // -1 because months are 0-based

  head = (
    <Head>
      <title>Filtered Events</title>
      <meta name="description" content={`All events for ${dateFilter.month}/${dateFilter.year}`} />
    </Head>
  )

  return (
    <>
      {head}
      <ResultsTitle date={date} />
      <EventList items={events} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context

  const year = +params!.slug![0]
  const month = +params!.slug![1]

  if (
    isNaN(year) || isNaN(month) ||
    year < 2021 || year > 2030 ||
    month < 1 || month > 12
  ) {
    return {
      props: { hasError: true } // we could also use notFound or redirect
    }
  }

  const dateFilter: DateFilter = { year, month }

  const events = await getFilteredEvents(dateFilter)

  return {
    props: {
      events,
      dateFilter
    }
  }
}

export default FilteredEventsPage
