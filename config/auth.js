const localStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const User = require('../models/User');

module.exports = function(passport){
    passport.use(new localStrategy({usernameField: 'email', passwordField: 'password'}, (email, password, done)=>{
        User.findOne({email: email}).then((user)=>{
            if(!user){
                console.log("Esta conta não existe!")
                return done(null, false, {message: 'Esta conta não existe!'})
            }else{
                bcrypt.compare(password, user.password, (erro, logged)=>{
                    if(logged){
                        console.log('Logged In!')
                        return done(null, user)
                    }else{
                        console.log('Senha incorreta!')
                        return done(null, false, {message: 'Senha incorreta!'})
                    }
                })
            }
        })
      }))
}

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
passport.deserializeUser(function(id, done) {
    User.findById(id).then(user => {
      done(null, user.id)
    }).catch(error => {
      console.error(error);
    });
});