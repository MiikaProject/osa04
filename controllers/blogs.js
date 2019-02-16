const blogsRouter = require('express').Router()
const Blog = require('../models/blog.js')


blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs.map(blog => blog.toJSON()))

  } catch (expection) {
    next(expection)
  }


})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  const blog = new Blog(body)

  if (blog.likes === null) {
    blog.likes = 0

  }

  if (blog.title === undefined || blog.url === undefined) {

    return response.status(400).send({ error: 'puuttuvia kenttia' })

  }

  try {
    const savedblog = await blog.save()
    response.json(savedblog.toJSON())

  } catch (expection) {
    next(expection)
  }




})


blogsRouter.delete('/:id', async (request, response, next) => {
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