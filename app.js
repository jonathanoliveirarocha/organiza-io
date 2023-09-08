const express = require('express')
const app = express()
const mongoose = require('mongoose');
const handlebars = require('express-handlebars')
const db = require('./config/db.js')
require('./models/User.js')
const user = mongoose.model('user')
const bcrypt = require('bcryptjs')
const passport = require('passport')


app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'));


app.get('/', (req, res)=>{
    res.render('auth/login')
})

app.get('/cadastro', (req, res)=>{
    res.render('auth/signin')
})

app.post('/cadastro', (req, res)=>{
    const newUser = new User({
        user: req.body.user,
        email: req.body.email,
        password: req.body.password
    })
    bcrypt.genSalt(10, (err, salt)=>{
        bcrypt.hash(newUser.password, salt, (err,hash)=>{
            if(err){
                console.log('Error to generate hash!')
                res.redirect('/cadastro')
            }else{
                newUser.password = hash 
                newUser.save().then(()=>{
                    console.log('User created successfully!')
                    res.redirect('/home')
                }).catch((err)=>{
                    console.log('Error to create user!')
                    res.redirect('/cadastro')
                })
            }
        })
    })

    
})


app.get('/home', (req, res)=>{
    res.render('index')
})



const PORT = process.env.PORT || 8081
app.listen(PORT, ()=>{
    console.log('Servidor rodando em: http://localhost:8081')
})