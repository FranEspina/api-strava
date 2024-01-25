import User from '../schemas/user.model.js'
import { hashAsync, generateRandomHashAsync } from '../services/cryptService.js'

function mockUser () {
  return new User({
    username: 'usuario', 
    firstname: 'nombre', 
    lastname: 'apellido',
    email: 'email@usuario.es', 
    password: "contraseña"
  })
}

function getMockUserPromise () {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockUser()), 200)
  })
}


export function getUserByIdAsync (id) {
  return getMockUserPromise()
}

export async function getUserByEMailAsync (email) {
  return getMockUserPromise()
}

export async function getUserByStravaIdAsync (strava_id) {
    return getMockUserPromise()
}

export async function getUserByUsernameAsync (username) {
  return getMockUserPromise()
}

export async function addUserAsync ({username, firstname, lastname, email, password}) {
  const newUser = new User({
    username: username, 
    firstname: firstname, 
    lastname: lastname,
    email: email, 
  })
  newUser.password = await hashAsync(password)
  return newUser
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

  return newUser

}

export const updateUserFromStravaAsync = async (strava_id, token_data) => {
  var user = await getMockUserPromise()
  user.strava_id = strava_id
  user.strava_data = {
    token_type: token_data.token_type,
    expires_at: token_data.expires_at,
    expires_in: token_data.expires_in,
    refresh_token: token_data.refresh_token,
    access_token: token_data.access_token
  }
  return user
}