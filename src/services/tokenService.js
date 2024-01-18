import jwt from 'jsonwebtoken'
import { token } from 'morgan'
import { TOKEN_SECRET, TOKEN_EXPIRES_IN } from '../config.js'

export function createAccessToken (payload) {

  return new Promise((resolve, reject) => {
    jwt.sign(
      payload, 
      TOKEN_SECRET(), 
      {
        'expiresIn': TOKEN_EXPIRES_IN()
      }, 
      (err, token) => {
        if (err) reject(err)
        resolve(token)
      }
    )
  })
}