

const errorHandler = (error, request, response, next) => {
    
  
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
      return response.status(400).send({ error: error.message })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    } else if (error.name === 'SyntaxError'){
      return response.status(400).json({error : 'syntax error'})
    }
  
    next(error)
  }

  module.exports = {
      errorHandler
  }