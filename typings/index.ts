import { ObjectId } from 'mongodb'

export type MeetingEventDetails = {
  title: string
  description: string
  location: string
  date: string
  image: string
  isFeatured: boolean
}

export type MeetingEvent = MeetingEventDetails & {
  id: string
}

export type DateFilter = {
  year: number
  month: number
}

export type EventComment= {
  _id?: ObjectId
  email: string
  name: string
  text: string
  eventId?: string
}
