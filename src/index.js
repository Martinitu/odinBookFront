import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import 'dotenv/config';

// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);


const mongoDB = process.env.MONGODB_URI;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}


const app = express();

app.use(cors());


const instaCLoneRouter = require('./routes/instaCloneRoutes');
const indexRouter = require('./routes/index');

app.use(express.json());
app.use('/', indexRouter);
app.use('/instaCLone', instaCLoneRouter);

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);