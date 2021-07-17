import { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient } from 'mongodb'
import { connectDatabase, insertDocument } from '../../../helpers/db-util'


export default async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method === 'POST') {
    type Body = { email?: string }

    const { email } = req.body as Body

    // validation has room for improvement :-)
    if (!email || !email.includes('@')) {
      return res.status(422).json({ message: 'Invalid email address.' })
    }

    let client: MongoClient

    try {
      client = await connectDatabase()
    } catch (error) {
      return res.status(500).json({ message: 'Connecting to the database failed.' })
    }
    
    try {
      await insertDocument(client, 'newsletter' , { email })
    } catch (error) {
      return res.status(500).json({ message: 'Inserting data failed.' })
    } finally {
      client.close()
    }

    // in mongodb atlas
    // create a cluster if you don't have one (a cluster can hold many db's)
    // in Database Access: create a user 
    // in Network Access: whitelist your current ip  (once you deployed, add the ip of the server you deployed to)
    // via Clusters > Connect > Connect your application: get the connection URI
    // replace the placeholders <password> and myFirstDatabase (if the db does not exist, it will be created)
    res.status(201).json({ message: 'Signed Up!' })
  }
}
