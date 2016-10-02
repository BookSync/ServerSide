module.exports = function (app, passport) {
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
};

function loggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}
