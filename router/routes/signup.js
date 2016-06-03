var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var User = mongoose.model('User')

router.get('/', function(req, res, next) {
    res.render('signup/signup')
})

router.post('/', function(req, res, next) {
    var body = req.body

    console.log('received something from client', body )
    if (!body.username || !body.password || !body.email) {
        return res.status(400).json({message: 'Please fill out all fields'})
    }

    var user = new User()
        console.log('_____WOOT!____')
    user.username = body.username
    user.email = body.email
    user.setPassword(body.password)
    user.save(function(err) {
        if(err) { return next(err) }
        return res.json({
            message: "we're coming from the server",
            token: user.generateJWT()
        })
    })
    
})

module.exports = router;