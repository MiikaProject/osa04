const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

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

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})