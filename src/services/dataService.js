import User from '../schemas/user.model.js'
import { hashAsync, generateRandomHashAsync } from '../services/cryptService.js'

export async function getUserByIdAsync (id) {
  return await User.findById(id)
}

export async function getUserByEMailAsync (email) {
  return await User.findOne({email})
}

export async function getUserByStravaIdAsync (strava_id) {
  try{
    return await User.findOne({strava_id})
  }
  catch(error){
    //La base de datos de MongoDb se cae si cambia la IP y el backend no tiene ip fija
    //si no puede guardar evitamos que falle el API y devolvemos el usuario sin guardar
    console.log(error)
    return null
  }
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

  try{
    return await newUser.save()
  }
  catch(error) {
    //La base de datos de MongoDb se cae si cambia la IP y el backend no tiene ip fija
    //si no puede guardar evitamos que falle el API y devolvemos el usuario sin guardar
    console.log(error)
    return newUser
  }

}

export const updateUserFromStravaAsync = async (strava_id, token_data) => {

  try{
    var user = await getUserByStravaIdAsync(strava_id)
  
    user.strava_data = {
      token_type: token_data.token_type,
      expires_at: token_data.expires_at,
      expires_in: token_data.expires_in,
      refresh_token: token_data.refresh_token,
      access_token: token_data.access_token
    }
  
    return await user.save()
  }
  catch(error){
    //La base de datos de MongoDb se cae si cambia la IP y el backend no tiene ip fija
    //si no puede guardar evitamos que falle el API y devolvemos el usuario sin guardar
    console.log(error)
    return {
      strava_id: strava_id, 
      strava_data: {
        token_type: token_data.token_type,
        expires_at: token_data.expires_at,
        expires_in: token_data.expires_in,
        refresh_token: token_data.refresh_token,
        access_token: token_data.access_token
      }
    }
  }
}