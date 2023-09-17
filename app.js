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
                          const newAppointment = new Appointments({
                            user: req.user, 
                          });
                        
                          newAppointment.save()
                          .then(savedDocument => {
                            console.log('Lista criada para usuário');
                          })
                          .catch(err => {
                            console.error(err);
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

        Appointments.findOne({user: req.user}).lean().then((appoints)=>{
            if(appoints){
              function ordHour(a, b) {
                const ha = a[0];
                const hb = b[0]; 
                return ha.localeCompare(hb);
              }
              
          
                res.render('index', {username: username, 
                  monday:appoints.monday.sort(ordHour),
                  tuesday:appoints.tuesday.sort(ordHour),
                  wednesday:appoints.wednesday.sort(ordHour),
                  thursday:appoints.thursday.sort(ordHour),
                  friday:appoints.friday.sort(ordHour),
                  saturday:appoints.saturday.sort(ordHour),
                  sunday:appoints.sunday.sort(ordHour),
                })
            }else{
                console.log('Erro')
            }
        }).catch((err)=>{
            console.log('Erro')
        })

        
        
      } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar o username do usuário' });
      }
})


app.post("/adicionar", (req, res) => {

    switch(req.body.daySelection) {
        case 'Segunda-Feira':
            Appointments.findOneAndUpdate(
                {user: req.user}, 
                { $push: { monday: [req.body.start, req.body.end, req.body.activity, req.body.desc] } }, 
              )
                .then((documentoAtualizado) => {
                  if (documentoAtualizado) {
               
                    res.redirect('/home')
                  } else {
                    console.log('Documento não encontrado');
                  }
                })
                .catch((error) => {
                  console.error('Erro ao atualizar o array:', error);
                });                
            break
        case 'Terça-Feira':
            Appointments.findOneAndUpdate(
                {user: req.user}, 
                { $push: { tuesday: [req.body.start, req.body.end, req.body.activity, req.body.desc] } }, 
              )
                .then((documentoAtualizado) => {
                  if (documentoAtualizado) {
                   
                    res.redirect('/home')
                  } else {
                    console.log('Documento não encontrado');
                  }
                })
                .catch((error) => {
                  console.error('Erro ao atualizar o array:', error);
                }); 
            break
        case 'Quarta-Feira':
            Appointments.findOneAndUpdate(
                {user: req.user}, 
                { $push: { wednesday: [req.body.start, req.body.end, req.body.activity, req.body.desc] } }, 
              )
                .then((documentoAtualizado) => {
                  if (documentoAtualizado) {
                  
                    res.redirect('/home')
                  } else {
                    console.log('Documento não encontrado');
                  }
                })
                .catch((error) => {
                  console.error('Erro ao atualizar o array:', error);
                }); 
            break
        case 'Quinta-Feira':
            Appointments.findOneAndUpdate(
                {user: req.user}, 
                { $push: { thursday: [req.body.start, req.body.end, req.body.activity, req.body.desc] } }, 
              )
                .then((documentoAtualizado) => {
                  if (documentoAtualizado) {
                   
                    res.redirect('/home')
                  } else {
                    console.log('Documento não encontrado');
                  }
                })
                .catch((error) => {
                  console.error('Erro ao atualizar o array:', error);
                }); 
            break
        case 'Sexta-Feira':
            Appointments.findOneAndUpdate(
                {user: req.user}, 
                { $push: { friday: [req.body.start, req.body.end, req.body.activity, req.body.desc]  } }, 
              )
                .then((documentoAtualizado) => {
                  if (documentoAtualizado) {
                  
                    res.redirect('/home')
                  } else {
                    console.log('Documento não encontrado');
                  }
                })
                .catch((error) => {
                  console.error('Erro ao atualizar o array:', error);
                }); 
            break
        case 'Sábado':
            Appointments.findOneAndUpdate(
                {user: req.user}, 
                { $push: { saturday: [req.body.start, req.body.end, req.body.activity, req.body.desc]  } }, 
              )
                .then((documentoAtualizado) => {
                  if (documentoAtualizado) {
                   
                    res.redirect('/home')
                  } else {
                    console.log('Documento não encontrado');
                  }
                })
                .catch((error) => {
                  console.error('Erro ao atualizar o array:', error);
                }); 
            break
        case 'Domingo':
            Appointments.findOneAndUpdate(
                {user: req.user}, 
                { $push: { sunday: [req.body.start, req.body.end, req.body.activity, req.body.desc]  } }, 
              )
                .then((documentoAtualizado) => {
                  if (documentoAtualizado) {
                   
                    res.redirect('/home')
                  } else {
                    console.log('Documento não encontrado');
                  }
                })
                .catch((error) => {
                  console.error('Erro ao atualizar o array:', error);
                }); 
            break
        default:

    }
})


app.get("/sair", (req, res) => {
    req.logout((err) => {
        res.redirect("/")
    })
})

app.get("/removerElemento/:day/:index", async (req, res) => {
  await Appointments.updateOne(
    { user: req.user },
    {
      $unset: { [`${req.params.day}.${req.params.index}`]: null },
    }
  );
  const result = await Appointments.updateOne(
    { user: req.user },
    {
      $pull: { [`${req.params.day}`]: null },
    }
  );
  res.redirect("/home")
})


const PORT = process.env.PORT || 8081
app.listen(PORT, ()=>{
    console.log('Servidor rodando em: http://localhost:8081')
})