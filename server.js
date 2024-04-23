import "dotenv/config";

import express from "express";
import morgan from "morgan";
import cors from "cors";
import taskRouter from "./src/routers/taskRouters.js";
import { connectMongo } from "./src/config/mondoDbConfig.js";

const PORT = process.env.port || 8000;
console.log(process.env.MONGODB_URL);
const app = express();
//middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/v1/tasks", taskRouter);
//express.json() converts request data to object which can be used by server

connectMongo();

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`Server running at http://localhost:${PORT}`);
});
