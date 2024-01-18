import { getUserTokensAsync } from '../services/stravaService.js'

export const exchange_token = async (req, res) => {
  console.log(req.body)

  console.log(req.query)

  const stravaResponse = await getUserTokensAsync(req.query.code)

  console.log(stravaResponse)

  return res.status(200).json(req.body)

}