import { config } from 'dotenv'
import app from './src/app.js'
import { connectDbAsync } from './src/db.js'

if (process.env.NODE_ENV) 
{
  console.log(process.env.NODE_ENV)
  config({ path: `./.env.${process.env.NODE_ENV}` })
}
else{
  config({ path: './.env' })
}

connectDbAsync()

app.listen(3000)

console.log('Aplicación en puerto', 3000)