const mongoose = require('mongoose')
const uniquevalidator = require('mongoose-unique-validator')

const userSchema =  mongoose.Schema({
    username:  {
        type:String,
        required:true,
        minlength:3,
        unique: true
    },
    name:{
        type: String,
        required: true,
        minlength:3
    } ,
    passwordHash: String,
    blogs : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ]

})

userSchema.plugin(uniquevalidator)


userSchema.set('toJSON', {
    transform: (document, returnedObject) =>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

const User = mongoose.model('User',userSchema)

module.exports = User