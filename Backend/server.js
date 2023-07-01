import express, { json } from "express";
import "dotenv/config"
import cors from "cors"
import images from './routes/image.js';

const app = express();

app.use(
  cors({
    credentials: true,
    origin: "*",
    methods: ["POST", "GET", "DELETE", "PUT", "PATCH", "OPTIONS"],
    allowedHeaders: [
      "Origin, X-Requested-With, X-AUTHENTICATION, X-IP, Content-Type, Accept, x-access-token, traceid",
    ],
  })
);

app.use(json());
app.use('/api', images)

const port = process.env.PORT || 5000;
const server = app.listen(port, async () => {
  console.log(`Listening on port ${port}...`);
});

export default server;
