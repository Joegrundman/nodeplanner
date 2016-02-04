/**
 * Routes Index
 */

 module.exports = function (app) {

   //Index
   app.use('/', require('./routes'))

   //Users
   app.use('/users', require('./routes/users'))

   //Europe
   app.use('/home', require('./routes/home'))

 }
