import { createUserFromStravaAsync, getUserByStravaIdAsync } from '../services/dataService.js'
import { getUserTokensAsync } from '../services/stravaService.js'

export const athlete_authorization = async (req, res) => {

  if (!req.body.authorization_code){
    console.log(`Se esperaba código de autorización. Request: ${req}`)
    return res.sendStatus(400)
  }

  const stravaResponse = await getUserTokensAsync(req.body.authorization_code)
  if (!stravaResponse.ok) return res.sendStatus(500)
  const athlete = stravaResponse.value.athlete
  
  try{
    let userFound = await getUserByStravaIdAsync(athlete.id)
    if (!userFound) {
      userFound = await createUserFromStravaAsync(stravaResponse)
    }
    return res.status(200).json({user: userFound, athlete: athlete})
  }
  catch (error){
    console.log(error)
    return res.sendStatus(500)
  }
}
