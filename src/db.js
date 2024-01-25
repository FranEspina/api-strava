import mongoose from 'mongoose'
import { MONGO_CONNSTRING } from './config.js'

export async function connectDbAsync () {
  try{
    if (process.env.USE_MOCK_DATA_SERVICE === 'yes'){
      console.log('Mock dataservices : database NOT connected')
      return 
    }
    await mongoose.connect(MONGO_CONNSTRING())
  } catch (error) {
    console.log(error)
  }
}
