import dotenv from "dotenv";
dotenv.config({ path: "dev.env" });
import app from "./app.js";
import { connectDB } from "./config/db.js";
const PORT = process.env.PORT || 3000;

app.use(function (req, res, next) {
  //Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request Method You want to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request header yo want to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Pass to next layer of middleware
  next();
})

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log('✅ Server is listening on port ' + PORT);
    });
  })
  .catch((err) => {
    console.error('❌ Failed to start server because DB connection failed.');
    process.exit(1); // optional: exit process if DB fails
  });
