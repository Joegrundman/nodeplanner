/**
 * Routes Index
 */

 module.exports = function (app) {

   //Index
   app.use('/', require('./routes'))
   
   app.use('/main', require('./routes/main'))

   //Users
   app.use('/users', require('./routes/users'))

   //Home = game screen
   app.use('/home', require('./routes/home'))
   
   // Signup
   app.use('/signup', require('./routes/signup'))
   
   // Login
   app.use('/login', require('./routes/login'))
 }
