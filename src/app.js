import express from 'express'
import morgan from 'morgan'
import authRoutes from './routes/auth.route.js'
import stravaRoutes from './routes/strava.routes.js'
import cookieParser from "cookie-parser"
import cors from 'cors'

const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(cors());

/*Restricting allowed hosts. If you want to restrict AJAX access to a single origin, you can use the origin option:
app.use(cors({
  origin: 'http://yourapp.com'
}));
*/

app.use('/api', authRoutes)
app.use('/api', stravaRoutes)


export default app
