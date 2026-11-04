import express from 'express'
import cors from 'cors'
import academicRouter from './routes/academic.routes'

const app = express()

app.use(cors({ origin: process.env.CORS_ORIGIN ?? '*' }))
app.use(express.json())
app.use('/api', academicRouter)

export default app
