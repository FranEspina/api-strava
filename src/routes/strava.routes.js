import { Router } from 'express'
import { athlete_authorization } from '../controllers/strava.controller.js'

const router = Router()

router.post('/athlete_authorization', athlete_authorization)

export default router