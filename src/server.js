import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRouter from "./routes/web";
import dentistRouter from "./routes/dentist";
import connectDB from "./config/connectDB";
import cors from "cors";
require("dotenv").config();

let app = express();
app.use(cors({ credentials: true, origin: "*" }));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));

viewEngine(app);
initWebRouter(app);
dentistRouter(app);

connectDB();

let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("server running " + port);
});
