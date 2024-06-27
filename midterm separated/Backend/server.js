import express from "express"
import bodyParser from 'body-parser';
import { config } from "dotenv";

config();

const app = express()
const PORT = process.env.PORT || 5000
import indexRouter from "./routes/index.js"

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use('/', indexRouter);


app.listen(PORT, ()=> console.log(`Server is listening in http://localhost:${PORT}`));