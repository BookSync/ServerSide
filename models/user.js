var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  _id: String,
  google: {
            access_token: String,
            name: String,
            email: String
          }
});

module.exports = mongoose.model('User', userSchema);
