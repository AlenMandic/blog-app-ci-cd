# Blog-sharing social media app

# Live website: https://snapblog.fly.dev

This project was made with the intention of having a website to save and browse other curated unique blog posts from around the internet. When searching for interesting blog posts via google you will only find entire blogs, and finding unique and interesting individual blog posts can be very hard.

IN PROGRESS/COMING SOON: Code optimization and improvements, design overhaul, search function/vector search for blogs

# Testing

- End-to-end tests were implemented using Cypress.IO
- Integration tests were implemented using JEST and Supertest, and a file containing helper functions and methods for testing.
- Testing is done on a special testing database, not the live production database.
- Basic API testing was done using `Postman`
- Linting was setup using `ESlint`

# Controllers
- Contains all of our relevant routes and resources

# Models
- Contains the shape and full validation of our Mongoose objects ( User and Blog )

# Utils
- Contains a lot of our logic and utility functions/middlewares. 
- `config.js` sets up all of our enviroment variables, ports, and secrets from our `.env` file.
- `logger.js` contains a more concise way of displaying informational or error messages throughout our app.
- `rateLimitMiddleware.js` contains a rate limiter for our app using the `express-rate-limit` package. Currently it is setup as a global route limiter, ensuring our application can't be infinitely spammed/brute-forced with requests.

# /Utils/middleware.js
- `getTokenFrom` decodes and validates JSON web tokens found in the headers of incoming requests from the client.
- `userExtractor` which runs on our protected / authenticated routes, finds out which User is making the request.
- `unknownEndpoint` which handles unknown endpoint requests.
- `errorHandler` handles our potential errors.

# app.js
- handles the biggest part of our app logic, establishes a connection to our database, and handles middleware ordering.

# index.js
- Starts the express application using `app.listen`, and listens for requests on our designated `PORT`

# UI / Front-End

- `Material UI` was used to style the website.

- `Axios` was used to handle services

- `React Router` was used to separate the website into relevant pages to enable full link sharing and a better user experience

- Pagination system and a sorting system was implemented

- The `services` folder contains all the logic for talking to our back-end and database
- `utils.js` exports commonly re-used functions across the project
- App will show various error, success or info notifications to the user depending on the status of their operations on the website.
- Handling of unknown or incorrect routes has been implemented using React Router

# Asynchronous state managament
- We control and synchronize state with an external system ( our MongoDB database ) using my own written custom hooks to handle fetching data, loading and error states

