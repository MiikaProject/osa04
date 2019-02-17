
const jwt = require('jsonwebtoken')
const errorHandler = (error, request, response, next) => {


  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: error.message })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'SyntaxError') {
    return response.status(400).json({ error: 'syntax error' })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    })
  }

  next(error)
}

const tokenExtractor = (request, response, next) => {


  const authorization = request.get('authorization')



  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {

    const token1 = authorization.substring(7)
    
    
    request.token = token1
    

    next()
  } else {
    next()
  }
  
}

module.exports = {
  errorHandler, tokenExtractor
}