// need to add more specific limiters, this is a basic global implementation.
const rateLimit = require("express-rate-limit")

const globalLimiter = rateLimit({
  windowMs: 18000000, // 5hours
  max: 5000, // 5000 requests every 5 hours
  message: "You are sending too many requests. Try again later.",
  headers: true,
})

module.exports = { globalLimiter }