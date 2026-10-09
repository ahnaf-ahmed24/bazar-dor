import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string;

if (!uri) {
  throw new Error("Please add your Mongo URI to environment variables");
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// Production ও Development উভয় পরিবেশেই MongoClient Caching নিশ্চিত করা
const globalWithMongo = global as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

if (!globalWithMongo._mongoClientPromise) {
  client = new MongoClient(uri);
  globalWithMongo._mongoClientPromise = client.connect();
}

clientPromise = globalWithMongo._mongoClientPromise;

export default clientPromise;