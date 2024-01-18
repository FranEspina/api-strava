import User from '../schemas/user.model.js'

export async function getUserByIdAsync (id) {
  return await User.findById(id)
}