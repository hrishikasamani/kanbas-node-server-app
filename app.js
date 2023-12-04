import express from 'express';
import session from "express-session";
import Hello from "./hello.js";
import Lab5 from "./Lab5.js";
import CourseRoutes from './courses/routes.js';
import ModuleRoutes from './module/routes.js';
import cors from "cors";
import mongoose from "mongoose";
const DB_CONNECTION_STRING="mongodb+srv://hrishikasamani:Hrishika1808@cluster0.wlfbjwj.mongodb.net/kanbas?retryWrites=true&w=majority";
const CONNECTION_STRING = DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas'
mongoose.connect(CONNECTION_STRING);
import UserRoutes from "./users/routes.js";
import "dotenv/config";
const app = express();
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL

}));
const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
  };
  if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
      sameSite: "none",
      secure: true,
    };
  }
  app.use(session(sessionOptions));  
app.use(express.json());
UserRoutes(app);
ModuleRoutes(app);
CourseRoutes(app);
Lab5(app);
Hello(app);
app.listen(process.env.PORT || 4000);
