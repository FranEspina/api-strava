import { Router } from 'express'
import { register, login, logout } from '../controllers/auth.controller.js'
import { profile } from '../controllers/profile.controller.js'
import { authRequired } from '../middlewares/validateToken.js'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)

router.get("/profile", authRequired, profile)

export default router

