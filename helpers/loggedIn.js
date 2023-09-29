// Checking if the user is authenticated
module.exports = {
  loggedIn: function(req, res , next){
      if (req.isAuthenticated()){
          return next()
      }
      res.redirect('/')
  }
}

