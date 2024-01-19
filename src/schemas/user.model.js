import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String, 
      required: true, 
      uniqued: true, 
      trim: true
    }, 
    firstname: {
      type: String, 
    }, 
    lastname: {
      type: String, 
    }, 
    email: {
      type: String, 
      trim: true
    }, 
    password: {
      type: String, 
      required: true
    }, 
    strava_id: {
      type: Number, 
    },     
    strava_data: {
      token_type: String,
      expires_at: Number,
      expires_in: Number,
      refresh_token: String,
      access_token: String,
    },
  }, {
    timestamps: true
  }
)

export default mongoose.model('User', userSchema)