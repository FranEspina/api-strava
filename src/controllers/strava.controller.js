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

export const athlete_refresh_token = async (req, res) => {

  if (!req.body.refresh_token){
    console.log(`Se esperaba código de refresco. Request: ${req}`)
    return res.sendStatus(400)
  }


  if (!req.body.strava_id){
    console.log(`Se esperaba identificador. Request: ${req}`)
    return res.sendStatus(400)
  }

  const stravaResponse = await refreshUserTokensAsync(req.body.authorization_code)
  if (!stravaResponse.ok) return res.sendStatus(500)
  const token_data = stravaResponse.value
  
  try{
    const strava_id = req.body.strava_id
    const userSaved = await updateUserFromStravaAsync(strava_id)
    if (!userSaved){
      console.log(`Código de usuario no válido. Request: ${req}`)
      return res.sendStatus(400)
    }

    return res.status(200).json({user: userSaved})
  }
  catch (error){
    console.log(error)
    return res.sendStatus(500)
  }
}
