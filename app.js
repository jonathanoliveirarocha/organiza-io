const express = require('express')
const app = express()
const handlebars = require('express-handlebars')


app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'));


app.get('/', (req, res)=>{
    res.render('auth/login')
})

app.get('/cadastro', (req, res)=>{
    res.render('auth/signin')
})


app.get('/home', (req, res)=>{
    res.render('index')
})



const PORT = process.env.PORT || 8081
app.listen(PORT, ()=>{
    console.log('Servidor rodando em: http://localhost:8081')
})