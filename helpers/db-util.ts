import { MongoClient } from 'mongodb'

const { MONGODB_USERNAME, MONGODB_PASSWORD, MONGODB_CLUSTER, MONGODB_DATABASE } = process.env

export const connectDatabase = async (): Promise<MongoClient> => {
  return await MongoClient.connect(
    `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_CLUSTER}.ul1xj.mongodb.net/${MONGODB_DATABASE}?retryWrites=true&w=majority`,
    { useUnifiedTopology: true }
  )
}

export const insertDocument = async (client: MongoClient, collection: string, document: object) => {
  const db = client.db()
  const result = await db.collection(collection).insertOne(document)
  return result
}

export async function getAllDocuments(client: MongoClient, collection: string, sort: object) {
  const db = client.db()
  const documents = await db
    .collection(collection)
    .find()
    .sort(sort)
    .toArray()
  return documents
}
