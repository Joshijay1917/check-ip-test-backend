import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())

import checkIpRouter from './routes/checkNetwork.routes.js'

app.use('/api/v1', checkIpRouter)

export { app }