import { STRAVA_APP_CLIENT_ID, STRAVA_APP_CLIENT_SECRET_ID } from '../config.js'
import axios from 'axios'

export async function getUserTokensAsync (authorization_code) {

  const urlStravaToken = 'https://www.strava.com/oauth/token'
  
  try{
    const response = await axios(
      {
        method: 'post',
        url: urlStravaToken,
        params: {
          client_id: STRAVA_APP_CLIENT_ID(),
          client_secret: STRAVA_APP_CLIENT_SECRET_ID(),
          grant_type: 'authorization_code',
          code: authorization_code,
        },
      })

    return {
      ok: true, 
      value: response.data,
      message: ''
    }
                    
  } catch (error) {
    console.log(error)
    return {
      ok: false, 
      value: null, 
      message: error.message, 
    }
  }
}

export async function refreshUserTokensAsync (refresh_token) {

  const urlStravaToken = 'https://www.strava.com/oauth/token'
  
  try{
    const response = await axios(
      {
        method: 'post',
        url: urlStravaToken,
        params: {
          client_id: STRAVA_APP_CLIENT_ID(),
          client_secret: STRAVA_APP_CLIENT_SECRET_ID(),
          grant_type: 'refresh_token',
          refresh_token: refresh_token,
        },
      })

    return {
      ok: true, 
      value: response.data,
      message: ''
    }
                    
  } catch (error) {
    console.log(error)
    return {
      ok: false, 
      value: null, 
      message: error.message, 
    }
  }
}
