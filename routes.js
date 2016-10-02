module.exports = function (app, passport) {
  app.get('/', function (req, res) {
    console.info("entry point");
    res.send("Welcome to BookSync!");
  });

  app.get('/home', function (req, res) {
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


