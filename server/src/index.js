import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./router/userRouter.js";
import { todoRouter } from "./router/todoListRouter.js";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json());
app.use(cors());
app.use("/auth", userRouter);
app.use("/todolists", todoRouter);



mongoose.connect(
  "mongodb+srv://patbern:todoapptodo12345@todo-app.bq2zim3.mongodb.net/todo-app"
);
// let today = new Date().toLocaleDateString();

// console.log(today);

app.listen(5000, () => {
  console.log("server is listening to port 5000....");
});
