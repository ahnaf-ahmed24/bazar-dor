import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

let clientPromise: Promise<MongoClient>;

if (!uri) {

  if (process.env.NODE_ENV === "production") {
    console.warn("MONGODB_URI is missing in production environment variables!");
  }
}

const globalWithMongo = global as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

if (uri) {
  if (!globalWithMongo._mongoClientPromise) {
    const client = new MongoClient(uri);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {

  clientPromise = Promise.reject(
    new Error("Please add your MONGODB_URI to environment variables")
  );
}

export default clientPromise;