import express, { Request, Response, Application } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import db from './db'
const app: Application = express()
app.use(cors())
app.use(helmet())
app.use(express.static('public'))

//check for db connection
db.connect((err: any) => {
  if (err) throw err
})
const PORT = process.env.PORT || 8000
app.listen(PORT, (): void => {
  console.log(`Server Running here 👉 https://localhost:${PORT}`)
})
