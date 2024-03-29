import express, { Application } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import db from './db'
import authRoutes from './Routes/adminRoutes/AuthRoutes'
import path from 'path'
import uploadRoute from './Routes/userRoutes/uploadRoutes'
import deptRoutes from './Routes/adminRoutes/deptRoutes'
import countsRouter from './Routes/adminRoutes/countsRoute'
import formRoute from './Routes/userRoutes/formRoutes'
var history = require('connect-history-api-fallback')

import { createFolder } from './upload'
const app = express()

app.use(function(_, res, next) {
    res.setHeader('Cross-Origin-Resource-Policy', 'same-site')
    next()
})

app.use(
    history({
        index: '/index.html'
    })
)

app.use(express.static(path.join(__dirname, 'client')))

app.get('/', (_, res) => {
    res.sendFile(path.join(__dirname, 'client/index.html'))
})

app.use(cors())
app.use(helmet())
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

createFolder()

//routes go here
app.use('/api/v1/', authRoutes)
app.use('/api/v1/', uploadRoute)
app.use('/api/v1', deptRoutes)
app.use('/api/v1/', countsRouter)
app.use('/api/v1/', formRoute)

//check for db connection
db.connect((err: any) => {
    if (err) throw err
})

const PORT = process.env.PORT || 8000
app.listen(PORT, (): void => {
    console.log(`Server Running here 👉 http://localhost:${PORT}`)
})
