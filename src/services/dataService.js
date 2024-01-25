import User from '../schemas/user.model.js'
import { hashAsync, generateRandomHashAsync } from '../services/cryptService.js'

import { getUserByIdAsync as getMockUserByIdAsync, 
         getUserByEMailAsync as getMockUserByEMailAsync, 
         getUserByStravaIdAsync as getMockUserByStravaIdAsync, 
         getUserByUsernameAsync as getMockUserByUsernameAsync, 
         addUserAsync as addMockUserAsync, 
         createUserFromStravaAsync as createMockUserFromStravaAsync, 
         updateUserFromStravaAsync as updateMockUserFromStravaAsync
} from './dataServiceMock.js'

export async function getUserByIdAsync (id) {
  if (process.env.USE_MOCK_DATA_SERVICE === 'yes') return await getMockUserByIdAsync(email)   
  return await User.findById(id)
}

export async function getUserByEMailAsync (email) {
  if (process.env.USE_MOCK_DATA_SERVICE === 'yes') return await getMockUserByEMailAsync(email)    
  return await User.findOne({email})
}

export async function getUserByStravaIdAsync (strava_id) {
  if (process.env.USE_MOCK_DATA_SERVICE === 'yes') return await getMockUserByStravaIdAsync(strava_id)    
  return await User.findOne({strava_id})
}

export async function getUserByUsernameAsync (username) {
  console.log('dentro addUserAsync ' + process.env.USE_MOCK_DATA_SERVICE)
  if (process.env.USE_MOCK_DATA_SERVICE === 'yes') return await getMockUserByUsernameAsync(username)
  return await User.findOne({username})
}

export async function addUserAsync ({username, firstname, lastname, email, password}) {
  if (process.env.USE_MOCK_DATA_SERVICE === 'yes') return await addMockUserAsync({username, firstname, lastname, email, password})
  
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
  if (process.env.USE_MOCK_DATA_SERVICE === 'yes') return await createMockUserFromStravaAsync(stravaData)

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

export const updateUserFromStravaAsync = async (strava_id, token_data) => {
  if (process.env.USE_MOCK_DATA_SERVICE === 'yes') return await updateMockUserFromStravaAsync(strava_id, token_data)

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