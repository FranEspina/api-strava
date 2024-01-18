import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js'

export const authRequired = (req, res, next) => {

  const { token } = req.cookies
  if (!token) return res.status(401).json({message: "Token desconocido. Usuario no autorizado"})

  jwt.verify(token, TOKEN_SECRET(), (error, decoded) => {
    if (error) return res.status(401).json({message: "Token inválido. Usuario no autorizado"})
    req.user = decoded // guardamos un atributo 'user' nuestro con la información que guarda el token
    next()
  })

}