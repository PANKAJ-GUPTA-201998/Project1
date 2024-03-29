const { Session } = require("inspector")
const User = require('../models/user')

module.exports.profile = function(req, res){
    return res.render('user_profile')
}
module.exports.signIn=function(req,res){
    if (req.isAuthenticated()){
        res.redirect('/users/profile');
    }
    return res.render('user_sign_in')
}
module.exports.signUp=function(req,res){
    if (req.isAuthenticated()){
        res.redirect('/users/profile')
    }
    return res.render('user_sign_up')
}
module.exports.destroySession = function(req, res) {
    req.logout(function(err) {
        if (err) {
            console.error('Error logging out:', err);
            return res.status(500).send('Error logging out');
        }
        return res.redirect('/');
    });
}


module.exports.create=function(req,res){
        if (req.body.password != req.body.confirm_password ){
            return res.redirect('back');
        }    

        async function findOrCreateUser() {
            try {
                const user = await User.findOne({ email: req.body.email });
                if (!user) {
                    const newUser = await User.create(req.body);
                    return res.redirect('/users/sign-in');
                } else {
                    return res.redirect('/users/sign-in');
                }
            } catch (error) {
                console.error("Error in finding or creating user during signup:", error);
                return res.status(500).send("Internal Server Error");
            }
        }
        
        findOrCreateUser();        
}




module.exports.create_session=function(req,res){
    return res.redirect('/');
}