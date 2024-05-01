const { Session } = require("inspector")
const User = require('../models/user')

module.exports.profile = async function(req, res) {
    try {
        // Assuming you want to retrieve the user from the database using the ID and then render the user profile.
        const profileUser = await User.findById(req.params.id);
        
        // Render the 'user_profile' view and pass the user data to the template.
        return res.render('user_profile', { profile: profileUser });
    } catch (error) {
        // Handle errors (e.g., User not found, database connection issues, etc.)
        console.error('Error fetching user:', error);
        
        // Respond with an error message or error page. Adjust the status code based on the error (e.g., 404 for not found, 500 for server errors)
        return redirect('back');
    }
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
// module.exports.destroySession = function(req, res) {
//     req.logout(function(err) { // Logout user first
//         if (err) {
//             console.error('Error logging out:', err);
//             return res.status(500).send('Error logging out');
//         }
//         req.flash('success', 'Logged out successfully'); // Set flash message after logging out
//         req.session.save(() => { // Ensure the session is saved with the flash message
//             res.redirect('/'); // Redirect after saving the session
//         });
//     });
// }
module.exports.destroySession = function (req, res) {
    req.logout(function (err) {
      req.flash('success','Sucessfully logged out');
      return res.redirect("/");
    });
  };
module.exports.create_session=function(req,res){
    req.flash('success','Logged in successfully')
    return res.redirect('/');
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






module.exports.update = async function(req, res) {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update user properties based on request body
        user.email = req.body.email;
        user.name = req.body.name;

        // Save the updated user to the database
        await user.save();

        // Redirect back to the previous page after successful update
        return res.redirect('back');
    } catch (error) {
        console.error('Error updating user:', error);
        
        // Redirect back to the previous page in case of an error
        return res.redirect('back');
    }
}

