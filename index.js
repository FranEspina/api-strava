import app from './src/app.js'
import { connectDbAsync } from './src/db.js'

connectDbAsync()

app.listen(3000)
console.log('Aplicación en puerto', 3000)