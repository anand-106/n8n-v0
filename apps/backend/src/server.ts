import dotenv from 'dotenv'
dotenv.config()

import express from "express";
import AuthRouter from "./routes/auth";
import WorkflowRouter from './routes/workflow'
import { jwtVerify } from './middlewares/jwt'; 
import { connectDB } from "./database/config";
import cors from 'cors'


async function main() {
  const PORT = 4000;

  const app = express();
  await connectDB();

  app.use(express.json());
  app.use(cors())


  app.get("/", (req, res) => {
    console.log("endpoint hit");
    res.json({ message: "Hello World" });
  });

  app.use("/auth", AuthRouter);

  app.use(jwtVerify)

  app.use('/workflow',WorkflowRouter)

  app.listen(PORT, () => {
    console.log(`\nserver running at port ${PORT}`);
  });
}
main();
