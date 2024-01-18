import express from 'express'
import morgan from 'morgan'
import authRoutes from './routes/auth.route.js'
import stravaRoutes from './routes/strava.routes.js'
import cookieParser from "cookie-parser"

const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

app.use('/api', authRoutes)
app.use('/api', stravaRoutes)


export default app
