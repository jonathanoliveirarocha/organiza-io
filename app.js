const express = require('express')
const app = express()
const mongoose = require('mongoose');
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser');
const db = require('./config/db')
const User = require('./models/User');
const Appointments = require('./models/Appointments');
const bcrypt = require('bcryptjs')
const passport = require('passport');
const {loggedIn} = require('./helpers/loggedIn');
require('./config/auth')(passport);
const session = require('express-session');

// Config
    // Views
    app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars')
    app.use(express.static(__dirname + '/public'));

    // body-parser
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json());

    // Sessions
    app.use(session({
        secret: 'jonathanorganizaio',
        resave: false,
        saveUninitialized: false,
    }));
    app.use(passport.initialize());
    app.use(passport.session());    


app.get('/', (req, res)=>{
    res.render('auth/login')
})
app.post('/',
    passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/',
  })
);

app.get('/cadastro', (req, res)=>{
    res.render('auth/signin')
})

app.post('/cadastro', async (req, res)=>{
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ username, email, password });
        bcrypt.genSalt(10, (err, salt)=>{
            bcrypt.hash(newUser.password, salt, (err,hash)=>{
                if(err){
                    console.log('Error to generate hash!')
                    res.redirect('/cadastro')
                }else{
                    newUser.password = hash 
                    newUser.save().then(()=>{
                        req.login(newUser, (err) => {
                            if (err) {
                              return res.status(500).send('Erro ao autenticar o usuário.');
                            }
                            res.redirect('/home')
                            console.log('User created successfully!')
                          });
                             
                    }).catch((err)=>{
                        console.log('Error to create user!')
                        res.redirect('/cadastro')
                    })
                }
            })
        })
    
      } catch (err) {
        res.status(500).json({ error: `try again!` });
      }
    
})


app.get('/home', loggedIn, async (req, res)=>{
    try {
        const user = await User.findById(req.user);
    
        if (!user) {
          return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        const username = user.username;
        
        res.render('index', {username: username})
      } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar o username do usuário' });
      }
})



app.get("/sair", (req, res) => {
    req.logout((err) => {
        res.redirect("/")
    })
})


const PORT = process.env.PORT || 8081
app.listen(PORT, ()=>{
    console.log('Servidor rodando em: http://localhost:8081')
})