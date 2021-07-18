import { DateFilter, MeetingEvent } from '../typings'

// https://firebase.google.com/docs/database/rest/retrieve-data

// TODO: error handling!!
// TODO: testing (optional)

export const getAllEvents = async (): Promise<MeetingEvent[]> => {
  const response = await fetch('https://nextjs-course-6da79-default-rtdb.firebaseio.com/events.json')
  const data: Record<string, MeetingEvent> = await response.json()
  const events: MeetingEvent[] = []
  for (const key in data) {
    events.push({ id: key, ...data[key] })
  }
  return events
}

export const getFeaturedEvents = async (): Promise<MeetingEvent[]> => {
  const response = await fetch('https://nextjs-course-6da79-default-rtdb.firebaseio.com/events.json?orderBy="isFeatured"&equalTo=true')
  const data: Record<string, MeetingEvent> = await response.json()
  const events: MeetingEvent[] = []
  for (const key in data) {
    events.push({ id: key, ...data[key] })
  }
  return events
}

// todo: error handling, also when id is not found, data seems to be {}
export const getEventById = async (id: string): Promise<MeetingEvent> => {
  const response = await fetch(`https://nextjs-course-6da79-default-rtdb.firebaseio.com/events.json?orderBy="$key"&equalTo="${id}"`)
  const data: Record<string, MeetingEvent> = await response.json()
  const event: MeetingEvent = { id, ...data[id] }
  return event
}

export const getFilteredEvents = async (dateFilter: DateFilter) => {
  const { year, month } = dateFilter
  const startAt = `${year}-${month.toString().padStart(2,'0')}-01`
  const endAt = `${year}-${month.toString().padStart(2,'0')}-${new Date(year, month-1, 0).getDate()}`
  const response = await fetch(`https://nextjs-course-6da79-default-rtdb.firebaseio.com/events.json?orderBy="date"&startAt="${startAt}"&endAt="${endAt}"`)
  const data: Record<string,MeetingEvent> = await response.json()
  const events: MeetingEvent[] = []
  for (const key in data) {
    events.push({id: key, ...data[key]})
  }
  return events
}
