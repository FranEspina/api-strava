import bcrypt from 'bcryptjs'

export async function hashAsync (value) {
  return await bcrypt.hash(value, 10)
}

export async function compareHashAsync(value, valueHashed) {
  console.log(valueHashed)
  return await bcrypt.compare(value, valueHashed)
}