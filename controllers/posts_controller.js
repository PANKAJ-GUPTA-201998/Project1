const Post = require('../models/post')
module.exports.create = async function(req, res) {
    try {
        const post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        console.log(post)
        return res.redirect('back');
    } catch (err) {
        console.log('Error in creating post:', err);
        return res.status(500).send('Error in creating post');
    }
};
module.exports.getHomePage = function(req, res) {
    // Check if user is logged in
    if (!req.isAuthenticated()) {
        // If not logged in, redirect to login page or handle unauthorized access
        return res.redirect('/');
    }

    // Find all posts by logged-in user's ID
    Post.find({ user: req.user._id })
        .then(posts => {
            // Render home page view and pass fetched posts and title
            res.render('home', { 
                posts: posts,
                title: 'Home' // Specify the title here, adjust as needed
            });
        })
        .catch(err => {
            console.log('Error fetching posts:', err);
            return res.status(500).send('Error fetching posts');
        });
};
