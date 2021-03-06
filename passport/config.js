const passport = require('passport');
const User = require('mongoose').model('User');

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
passport.deserializeUser(function(id, done) {
    User.findById(id)
    .populate('friends')
    .exec(function(err, user) {
        done(err, user);
    });
});