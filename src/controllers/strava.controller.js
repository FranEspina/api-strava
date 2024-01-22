import { createUserFromStravaAsync, getUserByStravaIdAsync, updateUserFromStravaAsync } from '../services/dataService.js'
import { getUserTokensAsync, refreshUserTokensAsync } from '../services/stravaService.js'

export const athlete_authorization = async (req, res) => {

  if (!req.body.authorization_code){
    console.log(`Se esperaba código de autorización. Request: ${req}`)
    return res.sendStatus(400)
  }

  const stravaResponse = await getUserTokensAsync(req.body.authorization_code)
  if (!stravaResponse.ok) return res.sendStatus(500)
  const athlete = stravaResponse.value.athlete
  const strava_id = athlete.id
  try{
    let userFound = await getUserByStravaIdAsync(strava_id)
    if (!userFound) {
      userFound = await createUserFromStravaAsync(stravaResponse)
    }
    else{
      
      const token_data = {
        token_type: stravaResponse.value.token_type,
        expires_at: stravaResponse.value.expires_at,
        expires_in: stravaResponse.value.expires_in,
        refresh_token: stravaResponse.value.refresh_token,
        access_token: stravaResponse.value.access_token
      }

      userFound = await updateUserFromStravaAsync(strava_id, token_data)
    }

    return res.status(200).json({user: userFound, athlete: athlete})
  }
  catch (error){
    console.log(error)
    return res.status(500).json({error: "Error creando usuario"})
  }
}

export const athlete_refresh_token = async (req, res) => {

  if (!req.body.refresh_token){
    console.log(`Se esperaba código de refresco. Request: ${req.body}`)
    return res.sendStatus(400)
  }


  if (!req.body.strava_id){
    console.log(`Se esperaba identificador. Request: ${req}`)
    return res.sendStatus(400)
  }

  console.log('validaciones pasadas')

  const stravaResponse = await refreshUserTokensAsync(req.body.refresh_token)
  if (!stravaResponse.ok) return res.sendStatus(500)
  const token_data = stravaResponse.value
  console.log('recuperado nuevo token')
  console.log(token_data)
  
  try{
    const strava_id = req.body.strava_id
    const userSaved = await updateUserFromStravaAsync(strava_id, token_data)
    if (!userSaved){
      console.log(`Código de usuario no válido. Request: ${req}`)
      return res.sendStatus(400)
    }

    console.log(userSaved)

    return res.status(200).json({user: userSaved})
  }
  catch (error){
    console.log(error)
    return res.sendStatus(500)
  }
}
