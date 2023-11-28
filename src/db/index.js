import * as dotenv from "dotenv";
dotenv.config();
import * as mongoose from "mongoose";

let dev_db_ur = process.env.MONGODB_URI_LOCAL;

const mongoDB = process.env.MONGODB_URI;
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose
  .connect(mongoDB, connectionParams)
  .then(() => {
    console.log("Connected to database ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });
export const db = mongoose.connection;
