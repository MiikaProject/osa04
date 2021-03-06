const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')
const api = supertest(app)

beforeEach(async () => {
    await Blog.remove({})


    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))


    const promiseArray = blogObjects.map(blog => blog.save())


    await Promise.all(promiseArray)
})

describe('get metodin testi', () => {
    test('notes are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

    })
    test('right number of content', async () => {
        const response = await api
            .get('/api/blogs')


        expect(response.body.length).toBe(helper.initialBlogs.length)

    })
})

describe('id in the right form', () => {
    test('id mode right', async () => {
        const response = await api.get('/api/blogs')


        expect(response.body[0].id).toBeDefined()

    })
})

describe('post method test', () => {
    test('number increases by one', async () => {

        const lisays = {
            "title": "Kurssi",
            "author": "TKY",
            "url": "yyyy",
            "likes": 10
        }
        await api.post('/api/blogs')
            .send(lisays)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()


        expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

        const titles = blogsAtEnd.map(blog => blog.title)
        expect(titles).toContain('Kurssi')

    })

    test('if like has no value then 0 is set', async () => {
        const lisays = {
            "title": "Kurssi",
            "author": "TKY",
            "url": "yyyy",
            "likes": ""
        }

        await api.post('/api/blogs')
            .send(lisays)


        const blogs = await helper.blogsInDb()

        blogs.map(blog => {
            if (blog.title === lisays.title) {

                expect(blog.likes).toBe(0)

            }
        })


    })

    test('invalid blog cant be added', async () => {
        const newBlog = {

            url: "urli",
            likes: 3
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })

})


describe('users', async () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const user = new User({ username: 'root', name: 'user', password: 'sekret' })
        await user.save()
    })

    test('lisays onnistuu', async () => {
        const usersAtStart = await helper.usersInDb()


        const newUser = {
            username: 'aikainen',
            name: 'lintu',
            password: 'nappaa'
        }


        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)



        const usersAtEnd = await helper.usersInDb()


        expect(usersAtEnd.length).toBe(usersAtStart.length + 1)


    })

    test('username already taken', async () => {
        const usersAtStart = await helper.usersInDb()


        const newUser = { username: 'root', name: 'user', password: 'sekret' }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)

    })

    test('username too short', async ()=>{
        const usersAtStart = await helper.usersInDb()


        const newUser = { username: 'r', name: 'user', password: 'sekret' }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })
})


afterAll(() => {
    mongoose.connection.close()
})