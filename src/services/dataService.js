import User from '../schemas/user.model.js'
import { hashAsync, generateRandomHashAsync } from '../services/cryptService.js'

export async function getUserByIdAsync (id) {
  return await User.findById(id)
}

export async function getUserByEMailAsync (email) {
  return await User.findOne({email})
}

export async function getUserByStravaIdAsync (strava_id) {
  return await User.findOne({strava_id})
}

export async function getUserByUsernameAsync (username) {
  return await User.findOne({username})
}

export async function addUserAsync ({username, firstname, lastname, email, password}) {
  
  const newUser = new User({
    username: username, 
    firstname: firstname, 
    lastname: lastname,
    email: email, 
  })
  newUser.password = await hashAsync(password)
  return await newUser.save()
}

export const createUserFromStravaAsync = async (stravaData) => {

  const athlete = stravaData.value.athlete
  const randomPassword = await generateRandomHashAsync()
  const newUser = new User ({
    strava_id: athlete.id, 
    username: athlete.username, 
    firstname: athlete.firstname, 
    lastname: athlete.lastname, 
    password: randomPassword, 
    email: null, 
    strava_data: {
      token_type: stravaData.value.token_type,
      expires_at: stravaData.value.expires_at,
      expires_in: stravaData.value.expires_in,
      refresh_token: stravaData.value.refresh_token,
      access_token: stravaData.value.access_token
    }
  })

  return await newUser.save()

}