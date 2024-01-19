import bcrypt from 'bcryptjs'

export async function hashAsync (value) {
  return await bcrypt.hash(value, 10)
}

export async function compareHashAsync(value, valueHashed) {
  console.log(valueHashed)
  return await bcrypt.compare(value, valueHashed)
}

export async function generateRandomHashAsync() {
  const randomKey = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  const hashedKey = await bcrypt.hash(randomKey, 10)
  return hashedKey
}

