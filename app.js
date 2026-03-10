import express from "express";
import cors from "cors";
import session from "express-session";
import apiRoutes from "./routes/apiRoutes.js";
import passport from "./config/passportConfig.js";

const app = express();
app.use(
  session({
    secret: "crmsecretkey",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());


app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use("/api", apiRoutes);



export default app;
