const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const blogRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')



const url = `mongodb://blogilista:fullstack1@ds135255.mlab.com:35255/blogilista`
const mongoUrl = url
mongoose.connect(mongoUrl, { useNewUrlParser: true })
.then(result =>{
  console.log('toimii');
  
})
.catch(error =>{
  console.log('ei toimi');
  
})

app.use(cors())
app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use('/api/blogs',blogRouter)
app.use(middleware.errorHandler)

module.exports = app