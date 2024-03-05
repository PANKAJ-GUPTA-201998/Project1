const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');


passport.use(new LocalStrategy({
    usernameField: 'email'
},
    async function(email, password, done) {
      try {
        const user = await User.findOne({ email: email });
        if (!user) { 
            console.log('Invalid Username');
            return done(null, false);
        }

        if (user.password != password) { 
            console.log('Invalid Password');
            return done(null, false);
        }

        return done(null, user);
      } catch (err) {
        console.log("Error in finding user:", err);
        return done(err);
      }
    }
));


//serealizing user to which key in the cookie
passport.serializeUser(function(user,done){
    done(null,user.id);
})
//deserealizing  the user key from cookies

passport.deserializeUser(function(id, done) {
    User.findById(id)
        .then(user => {
            if (!user) {
                console.log('User not found');
                return done(null, false);
            }
            return done(null, user);
        })
        .catch(err => {
            console.log('Error finding user:', err);
            return done(err);
        });
});




module.exports = passport;

  


  

