require('dotenv').config()

// Production testing DB for GithubActions remote machine: MONGODB_TEST_URI
// LOCAL TESTING test DB: TESTING_URL

const PORT = process.env.PORT || 3000

const MONGODB_URL = process.env.NODE_ENV === 'TEST' ?
  process.env.TESTING_URL : process.env.MONGODB_URL

module.exports = { PORT, MONGODB_URL }