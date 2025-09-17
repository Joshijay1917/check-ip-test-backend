import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

import checkIpRouter from './routes/checkNetwork.routes.js'
import qrRouter from './routes/qrcode.routes.js'

app.use('/api/v1', checkIpRouter)
app.use('/api/v1/qr', qrRouter)

export { app }
