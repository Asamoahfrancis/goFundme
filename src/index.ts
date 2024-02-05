import express from "express";
import "dotenv/config";
import { UserRoute } from "./Routes/userRoute";
import { ContactRoute } from "./Routes/contactRoute";
import { dbConnection, closeDb } from "./Database/db";
//.....
const app = express();
app.use(UserRoute);
app.use(ContactRoute);
dbConnection();
//......
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

process.on("SIGINT", async () => {
  await closeDb();
  process.exit(0);
});
