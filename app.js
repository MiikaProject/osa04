const config = require('./utils/config')
const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const blogRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const middleware = require('./utils/middleware')
const loginRouter = require('./controllers/login')



mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
.then(result =>{
  console.log('toimii');
  
})
.catch(error =>{
  console.log('ei toimi');
  
})

app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(middleware.tokenExtractor)
app.use('/api/blogs',blogRouter)
app.use('/api/users',usersRouter)
app.use('/api/login',loginRouter)
app.use(middleware.errorHandler)


module.exports = app