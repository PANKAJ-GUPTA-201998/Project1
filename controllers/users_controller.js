const { Session } = require("inspector")
const User = require('../models/user')

module.exports.profile = async function(req, res) {
    try {
        if (req.cookies.user_id) {
            const user = await User.findById(req.cookies.user_id);
            if (user) {
                return res.render('user_profile');
            }
            return res.redirect('/sign-in');
        } else {
            return res.redirect('/sign-in');
        }
    } catch (err) {
        console.error("Error finding user:", err);
        return res.status(500).send("Internal Server Error");
    }
};


module.exports.signIn=function(req,res){
    return res.render('user_sign_in')
}
module.exports.signUp=function(req,res){
    return res.render('user_sign_up')
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




module.exports.create_session = async function(req, res) {
    try {
        // Find the user
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            console.log("User email not found");
            return res.redirect('back');
        }

        // Handle incorrect password
        if (user.password !== req.body.password) {
            return res.redirect('back');
        }

        // Set user_id cookie and redirect to profile
        res.cookie('user_id', user.id);
        return res.redirect('/users/profile');
    } catch (error) {
        console.error("Error occurred:", error);
        return res.redirect('back');
    }
}
//to delete session by sign_out
module.exports.delete_session=function(req,res){
    res.clearCookie('user_id'); // Replace 'user_id' with the name of your cooki
    res.redirect('/users/sign-in'); // Redirect to the desired location after deleting cokie
}