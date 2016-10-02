var User = require('./models/user.js');

module.exports = function (app, passport) {
  app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
  });
  
  app.get('/', function (req, res) {
    res.send("Welcome to BookSync!");
  });

  app.get('/home', loggedIn, function (req, res) {
    res.send(req.user);
  });
  
  app.get('/auth/google', passport.authenticate('google', 
        {scope: ['profile', 'email']}
  ));

  app.get('/auth/google/callback', passport.authenticate('google', 
        {
          successRedirect: '/home',
          failureRedirect: '/'
        }));

  app.get('/bookmarks', function (req, res) {
    console.info(req.param('email'));
    User.findOne({'google.email': req.param('email')}, function (err, user) {
      if (err)
        res.send(err);
      if (user) {
        res.send(user.bookmarks);
      } else {
        res.send("User not found");
      }
    });
  });

};

function loggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}
