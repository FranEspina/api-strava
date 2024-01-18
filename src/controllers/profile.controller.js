import { getUserByIdAsync } from '../services/dataService.js'

export async function profile (req, res) {

  const userFound = await getUserByIdAsync(req.user.id)

  if (!userFound) return res.status(404).json({"message": "Usuario no válido"})

  return res.status(200).json({
    id: userFound._id, 
    username: userFound.username, 
    email: userFound.email,
    createdAt: userFound.createdAt, 
    updatedAt: userFound.updatedAt,  
  })
}