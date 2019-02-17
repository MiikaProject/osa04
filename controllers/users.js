const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')

usersRouter.post('/', async (request, response, next) => {
    const body = request.body
    const users = await User.find({})
    usernames = users.map(user => user.username)

    /*
    if (usernames.includes(request.body.username)) {
        return response.status(400).send({ error: 'käyttäjänimi on jo' })

    }

    if (body.name === undefined || body.username === undefined) {
        return response.status(400).send({ error: 'tietoa puuttuu' })
    }
    */


    try {
        const body = request.body
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash,
        })

        const savedUser = await user.save()
        response.json(savedUser)


    } catch (error) {
        next(error)
    }
})


usersRouter.get('/', async (request, response, next) => {
    try {
        const users = await User.find({}).populate('blogs',{title:1,author:1,url:1,id:1})
        response.json(users.map(user => user.toJSON()))

    } catch (error) {
        next(error)
    }
})


module.exports = usersRouter