import { Router } from 'express'
import { exchange_token } from '../controllers/strava.controller.js'
import { authRequired } from '../middlewares/validateToken.js'

const router = Router()

if (process.env.NODE_ENV = 'development'){
  router.post('/exchange_token', exchange_token)
}
else{
  router.post('/exchange_token', authRequired, exchange_token)
}

export default router