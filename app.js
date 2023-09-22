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
const flash = require('connect-flash');
const e = require('connect-flash');


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

    //flash
    app.use(flash());
    app.use((req, res, next)=>{
      res.locals.success_msg = req.flash('success_msg')
      res.locals.error_msg = req.flash('error_msg')
      res.locals.error = req.flash('error')
      res.locals.user = req.user || null
      next()
    })

app.get('/', (req, res)=>{
    res.render('auth/login')
})
app.post('/',(req, res, next)=>{
    passport.authenticate('local', {
      successRedirect: '/home',       
      failureRedirect: '/',
      failureFlash: true
    })(req, res, next)
  });

app.get('/cadastro', (req, res)=>{
    res.render('auth/signin')
})

app.post('/cadastro', async (req, res)=>{
      const { username, email, password,password1 } = req.body;
      const existingUser = await User.findOne({ email });
      var error=[]
      if(username=='' || email=='' || password=='' || password1==''){
        error.push("Por favor, preencha todos os campos!")
      }
      if(existingUser){
        error.push("Este E-mail já está sendo utilizado!")
      }
      if(password<8){
        error.push("A senha deve conter pelo menos 8 caracteres!")
      }
      if(password!=password1){
        error.push("As senhas não conferem!")
      }
      if(error.length>0){
        req.flash('error_msg', `${error[0]}`)
        res.redirect('/cadastro')
      }else{
        try {
          const { username, email, password } = req.body;
          const newUser = new User({ username, email, password });
          bcrypt.genSalt(10, (err, salt)=>{
              bcrypt.hash(newUser.password, salt, (err,hash)=>{
                  if(err){
                      req.flash('error_msg', 'Erro ao cadastrar usuário!')
                      res.redirect('/cadastro')
                  }else{
                      newUser.password = hash 
                      newUser.save().then(()=>{
                          req.login(newUser, (err) => {
                              if (err) {
                                req.flash('error_msg', 'Erro ao autenticar usuário!')
                                res.redirect('/')
                              }
                              res.redirect('/home')
                            });
                            const newAppointment = new Appointments({
                              user: req.user, 
                            });
                          
                            newAppointment.save()
                            .then(savedDocument => {
                              console.log('List created for user!');
                            })
                            .catch(err => {
                              console.error(err);
                            });
                      }).catch((err)=>{
                          req.flash('error_msg', 'Erro ao cadastrar usuário!')
                          res.redirect('/cadastro')
                      })
                  }
              })
          })
      
        } catch (err) {
          req.flash('error_msg', 'Erro ao cadastrar usuário!')
          res.redirect('/cadastro')
        }

      } 
})


app.get('/home', loggedIn, async (req, res)=>{
    try {
        const user = await User.findById(req.user);
    
        if (!user) {
          req.flash('error_msg', 'Usuário não encontrado!')
          res.redirect('/')
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
              req.flash('error_msg', 'Erro ao carregar dados!')
              res.redirect('/')
            }
        }).catch((err)=>{
          req.flash('error_msg', 'Erro ao carregar página!')
          res.redirect('/')
        })  
      } catch (error) {
          req.flash('error_msg', 'Erro ao carregar página!')
          res.redirect('/')
      }
})


app.post("/adicionar", (req, res) => {
    var days=[['monday', 'Segunda-Feira'], ['tuesday', 'Terça-Feira'], ['wednesday', 'Quarta-Feira'], ['thursday','Quinta-Feira'],
            ['friday','Sexta-Feira'], ['saturday', 'Sábado'], ['sunday', 'Domingo']]
    var dayEnglish;
    for(var i=0;i<7;i++){
      if(req.body.daySelection==days[i][1]){
        dayEnglish=days[i][0]
        break
      }
    }  

    Appointments.findOneAndUpdate(
      {user: req.user}, 
      { $push: { [`${dayEnglish}`]: [req.body.start, req.body.end, req.body.activity, req.body.desc] } }, 
    ).then((document) => {
      if (document) {
        req.flash('success_msg', 'Adicionado com sucesso!')
        res.redirect('/home')
      }else{
        req.flash('error_msg', 'Erro ao adicionar compromisso!')
        res.redirect('/home')
      }
      }).catch((error) => {
        req.flash('error_msg', 'Erro ao adicionar compromisso!')
        res.redirect('/home')
      });   
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
  req.flash('success_msg', 'Removido com sucesso!')
  res.redirect("/home")
})


const PORT = process.env.PORT || 8081
app.listen(PORT, ()=>{
    console.log('Servidor rodando em: http://localhost:8081')
})