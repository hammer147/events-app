import { NextApiRequest, NextApiResponse } from 'next'
import { InsertOneResult, MongoClient } from 'mongodb'
import { EventComment } from '../../../typings'
import { connectDatabase, insertDocument, getAllDocuments } from '../../../helpers/db-util'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { eventId } = <{ eventId: string }>req.query

  // CONNECTION
  let client: MongoClient
  try {
    client = await connectDatabase()
  } catch (error) {
    return res.status(500).json({ message: 'Connecting to the database failed.' })
  }

  // POST A COMMENT
  if (req.method === 'POST') {

    type Body = {
      email?: string
      name?: string
      text?: string
    }

    const { email, name, text } = req.body as Body

    // validation
    if (!email || !email.includes('@') ||
      !name || name.trim() === '' ||
      !text || text.trim() === ''
    ) {
      // client.close()
      return res.status(422).json({ message: 'Invalid input!' })
    }

    const newComment: EventComment = {
      email,
      name,
      text,
      eventId
    }

    let result: InsertOneResult<Document>

    try {
      result = await insertDocument(client, 'comments', newComment)
      newComment._id = result.insertedId
      res.status(201).json({ message: 'Comment added.', comment: newComment })
    } catch (error) {
      res.status(500).json({ message: 'Inserting comment failed.' })
    }
  }

  // GET ALL COMMENTS
  if (req.method === 'GET') {
    try {
      const documents = await getAllDocuments(client, 'comments', { _id: -1 }, { eventId })
      res.status(200).json({ comments: documents })
    } catch (error) {
      res.status(500).json({ message: 'Getting comments failed.' })
    }
  }

  // client.close()
}

/**
 * If the API route will be hit frequently,
 * you might want to take advantage of MongoDB's "connection pooling".
 * For this, simply remove all client.close() calls from your code.
 * The connection will then NOT be closed and will be re-used across requests.
 */