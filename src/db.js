import mongoose from 'mongoose'
import { MONGO_CONNSTRING } from './config.js'

export async function connectDbAsync () {
  try{
    await mongoose.connect(MONGO_CONNSTRING())
    console.log('database connected')
  } catch (error) {
    console.log(error)
  }
}
