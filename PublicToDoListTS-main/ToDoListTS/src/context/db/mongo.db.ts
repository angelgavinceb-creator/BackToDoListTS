import { MongoClient, Collection, Db } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.MONGO_URL || "";
const dbName = process.env.MONGO_DB_NAME || "toDoList";
const collections: { [key: string]: Collection } = {};

async function createMongoConnection() {
  try {
    const client = await MongoClient.connect("");
    const db = client.db(dbName);
    addCollections(db);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

const addCollections = (db: Db) => {
  collections.users = db.collection("users");
  collections.tareas = db.collection("tareas");
};

export default createMongoConnection;
export { collections };
