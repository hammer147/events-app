import { MongoClient, Sort } from 'mongodb'

const { MONGODB_USERNAME, MONGODB_PASSWORD, MONGODB_CLUSTER, MONGODB_DATABASE } = process.env

export const connectDatabase = async (): Promise<MongoClient> => {
  return await MongoClient.connect(
    `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_CLUSTER}.ul1xj.mongodb.net/${MONGODB_DATABASE}?retryWrites=true&w=majority`
  )
}

export const insertDocument = async (client: MongoClient, collection: string, document: object) => {
  const db = client.db()
  const result = await db.collection(collection).insertOne(document)
  return result
}

export async function getAllDocuments(client: MongoClient, collection: string, sort: Sort, filter = {}) {
  const db = client.db()
  const documents = await db
    .collection(collection)
    .find(filter)
    .sort(sort)
    .toArray()
  return documents
}
