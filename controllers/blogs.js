const blogsRouter = require('express').Router()

const Blog = require('../models/blog.js')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}


blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs.map(blog => blog.toJSON()))

  } catch (expection) {
    next(expection)
  }


})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  const token =getTokenFrom(request)

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' }).end()
    }

    const user = await User.findById(decodedToken.id)
    
    

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })
    
    
    if (blog.likes === null) {
      blog.likes = 0
  
    }
    if (blog.title === undefined || blog.url === undefined) {

      return response.status(400).send({ error: 'puuttuvia kenttia' }).end()
  
    }
    //tässä jotain hasssua salee....
    const savedblog = await blog.save()
    
    
    user.blogs = user.blogs.concat(savedblog._id)
    await user.save()
    return response.json(savedblog.toJSON())


  } catch (error){
    next(error)
  }


})


blogsRouter.delete('/:id', async (request, response, next) => {
  console.log(request.token);
  
  
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()

  } catch (error) {
    next(error)
  }
})


blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  console.log(body);

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  if (blog.likes === '') {
    blog.likes = 0
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog.toJSON())
  } catch (error) {
    next(error)
  }

})


module.exports = blogsRouter