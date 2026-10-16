import express from 'express'
import academicRouter from './routes/academic.routes'

const app = express()


app.use(express.json())
app.use('/api', academicRouter)

export default app
