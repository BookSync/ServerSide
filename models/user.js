var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  google: {
            id: String,
            access_token: String,
            name: String,
            email: String
          }
});

module.exports = mongoose.model('User', userSchema);
