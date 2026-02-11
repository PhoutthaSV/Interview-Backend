import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import http from 'http'
import * as dotenv from 'dotenv';

//================Routes========================
import {db} from './db/model/index.js'
import auth from './routes/auth.routes.js'


dotenv.config()
const port = Number(process.env.PORT) || 5969
var app = express()
const server = http.createServer(app)
app.set('trust proxy', true);
app.use(cors())
app.use(bodyParser.json())

app.use(auth)

server.listen(port, function () {
  console.log(`CORS-enabled web server listening on port ${port}`)
})