import User from '../schemas/user.model.js'
import { compareHashAsync } from '../services/cryptService.js'
import jwt from 'jsonwebtoken'
import { createAccessToken } from '../services/tokenService.js'
import { addUserAsync, getUserByIdAsync, getUserByUsernameAsync } from '../services/dataService.js'

export const register = async (req, res) => {

  try{
    const userSaved = await addUserAsync(req.body)
    const payload = {id: userSaved._id}
    var token = await createAccessToken(payload) 
    res.cookie('token', token)

    return res.status(200).json({
      id: userSaved._id, 
      username: userSaved.username, 
      firstname: userSaved.firstname, 
      lastname: userSaved.lastname, 
      email: userSaved.email,
      createdAt: userSaved.createdAt, 
      updatedAt: userSaved.updatedAt,  
      strava_id: 0
    })
  }
  catch (error) {
    console.log(error)
    res.status(500).json({message: error})
  }
}

export const login = async (req, res) => {
  const { username, password } =  req.body 

  try {

    const userFound = await getUserByUsernameAsync(username)
    if (!userFound) return res.status(400).json({message: 'Usuario y/o contraseña incorrectos'}) 

    var okPassword = await compareHashAsync(password, userFound.password)
    if (!okPassword) return res.status(400).json({message: 'Usuario y/o contraseña incorrectos'}) 

    const payload = {id: userFound._id}
    var token = await createAccessToken(payload) 

    res.cookie('token', token)

    return res.status(200).json({
      id: userFound._id, 
      username: userFound.username, 
      firstname: userFound.firstname, 
      lastname: userFound.lastname, 
      email: userFound.email,
      strava_id: userFound.strava_id, 
      createdAt: userFound.createdAt, 
      updatedAt: userFound.updatedAt,  
    })

  }
  catch (error) {
    console.log(error)
    res.status(500).json({message: error})
  }
}

export const logout = (req, res) => {
  res.cookie('token', '', {expires: new Date(0)})
  res.status(200).json({message: "Sesión cerrada correctamente"})
}

export async function profile (req, res) {

  const userFound = await getUserByIdAsync(req.user.id)
  if (!userFound) return res.status(404).json({"message": "Usuario no válido"})

  return res.status(200).json({
    id: userFound._id, 
    username: userFound.username, 
    firstname: userFound.firstname, 
    lastname: userFound.lastname, 
    email: userFound.email,
    strava_id: userFound.strava_id, 
    createdAt: userFound.createdAt, 
    updatedAt: userFound.updatedAt,  
  })
}