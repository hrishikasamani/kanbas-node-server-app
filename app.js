import express from 'express';
import session from "express-session";
import Hello from "./hello.js";
import Lab5 from "./Lab5.js";
import CourseRoutes from './courses/routes.js';
import ModuleRoutes from './module/routes.js';
import cors from "cors";
import mongoose from "mongoose";
mongoose.connect("mongodb://127.0.0.1:27017/kanbas");
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
