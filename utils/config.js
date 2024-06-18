require('dotenv').config()

const PORT = process.env.PORT || 3003

const MONGODB_URL = process.env.NODE_ENV === 'TEST' ?
  process.env.MONGODB_TEST_URI : process.env.MONGODB_URL // testing URL changed to work in github actions workflow alongside github action secrets

module.exports = { PORT, MONGODB_URL }