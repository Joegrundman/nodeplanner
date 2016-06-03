var mongoose = require('mongoose')
var crypto = require('crypto')
var jwt = require('jsonwebtoken')
var secret = require('../config').secret


var UserSchema =  new mongoose.Schema({
    username: {type: String, unique: true},
    email: {type: String, unique: true},
    passwordHash: String,
    salt: String,
    admin: Boolean,
    props: {}
})

UserSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex')
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex')
}

UserSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex')
    return this.hash === hash
}

UserSchema.methods.generateJWT = function() {
    // set expiration to 14 days
    var today = new Date()
    var exp = new Date(today)
    exp.setDate(today.getDate() +14)
    
    return jwt.sign({
        _id: this.id,
        username: this.username,
        exp: parseInt(exp.getTime()/ 1000)
    }, secret)
}

mongoose.model('User', UserSchema)