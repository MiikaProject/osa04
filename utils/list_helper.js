var _ = require('lodash');

const blogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }
]



const dummy = (blogs) => {
    return 1
}



const totalLikes = (blogs) => {
    let luvut = blogs.map(a => a.likes)


    const reducer = (sum, item) => {
        return sum + item
    }

    return (luvut.reduce(reducer, 0))

}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return 0
    }
    let eka = blogs[0].likes
    let luvut = blogs.map(blogi => {
        if (blogi.likes > eka) {
            eka = blogi
        }

    })

    const palautettava = {
        title: eka.title,
        author: eka.author,
        likes: eka.likes
    }

    return (palautettava)



}

const mostBlogsAuthor = (blogs) => {

    let kirjailijat = blogs.map(blog => blog.author)

    kirjailijat = kirjailijat.map(kirjailija => {
        return ({
            author: kirjailija,
            times: 0
        })
    })

    kirjailijat.forEach(kirjailija => {
        var luku = 0;

        for (var i = 0; i < kirjailijat.length; i++) {
            if (kirjailijat[i].author === kirjailija.author) {

                luku++
            }
        }
        kirjailija.times = luku
    })
    let isoin = (kirjailijat.map(kirjailija => (kirjailija.times)))
    isoin = Math.max(...isoin)

    kirjailijat = kirjailijat.filter(kirjailija => {
        if (kirjailija.times === isoin) {
            eniten = kirjailija.times
            return (kirjailija)
        }
    })


    return ({
        author: kirjailijat[0].author,
        blogs: kirjailijat[0].times
    })

}



const mostLikes = (blogs) => {
    let kirjailijat = blogs.map(blog => blog.author)

    kirjailijat = kirjailijat.map(kirjailija => {
        return ({
            author: kirjailija,
            likes: 0
        })
    })



    kirjailijat.forEach(kirjailija => {
        for (i = 0; i < blogs.length; i++) {
            if (kirjailija.author === blogs[i].author) {
                kirjailija.likes += blogs[i].likes
            }
        }
    })


    let liket = kirjailijat.map(k => k.likes)
    let eniten = Math.max(...liket)

    console.log(eniten);

    kirjailijat = kirjailijat.filter(kirjailija => {
        if(kirjailija.likes ===eniten){
            return kirjailija
        }
    })

    return({
        author:kirjailijat[0].author,
        likes:kirjailijat[0].likes
    })
    

    

}



module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogsAuthor,
    mostLikes
}


