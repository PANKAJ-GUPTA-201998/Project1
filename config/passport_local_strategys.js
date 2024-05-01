const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');


passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true, // Pass the req object to the callback function
},
    async function(req,email, password, done) {
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

// passport.use(
//     new LocalStrategy(
//       {
//         usernameField: 'email',
//         passReqToCallback: true // Pass the req object to the callback function
//       },
//       async function(req,email, password, done) {
//         try {
//           const user = await User.findOne({ email: email });
  
//           if (!user) { 
//               req.flash('error', 'Invalid username');
//               return done(null, false);
//           }
  
//           if (user.password != password) { 
//               req.flash('error', 'Invalid password');
//               return done(null, false);
//           }
  
//           return done(null, user);
//         } catch (err) {
//           console.log('Error in finding user --> Passport');
//           return done(err);
//         }
//       }
//     )
//   );


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
//check if the user is authenticated or not;
passport.checkAuthentication = function(req,res,next){
    //if the user is signed in
    if (req.isAuthenticated()){
        return next();
    }
    //if the user is not signed in then pass this function to the controller/next function
    return res.redirect('/users/sign-in')
}

// req.user contains the current signed in user from session cookies  and we are just sending this to the local for the  views .
passport.setAuthenticatedUser = function(req,res,next){
    if (req.isAuthenticated()){
        res.locals.user = req.user;
    }
        return next();
}



module.exports = passport;

  


  

