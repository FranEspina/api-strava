import { Router } from 'express'
import { athlete_authorization, athlete_refresh_token} from '../controllers/strava.controller.js'

const router = Router()

router.post('/athlete_authorization', athlete_authorization)
router.post('/athlete_refresh_token', athlete_refresh_token)

export default router