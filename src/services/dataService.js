import User from '../schemas/user.model.js'
import { hashAsync } from '../services/cryptService.js'

export async function getUserByIdAsync (id) {
  return await User.findById(id)
}

export async function getUserByEMailAsync (email) {
  return await User.findOne({email})
}

export async function addUserAsync ({username, email, password}) {
  const newUser = new User({
    username: username, 
    email: email, 
  })
  newUser.password = await hashAsync(password)
  return await newUser.save()
}