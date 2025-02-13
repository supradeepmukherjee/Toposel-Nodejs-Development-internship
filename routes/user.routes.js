import { Router } from 'express'
import { loginValidator, registrationValidator, searchValidator, validateHandler } from '../lib/validators.js'
import { isAuthenticated } from '../middlewares/auth.js'
import { login, register, searchUser } from '../controllers/user.controllers.js'

const app = Router()

app.post('/register', registrationValidator(), validateHandler, register)
app.post('/login', loginValidator(), validateHandler, login)

app.use(isAuthenticated)
app.get('/search', searchValidator(), validateHandler, searchUser)

export default app