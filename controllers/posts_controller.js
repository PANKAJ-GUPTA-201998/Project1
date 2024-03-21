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


// Function to fetch posts belonging to the logged-in user

module.exports.home = async function(req, res) {
    try {
        // Fetch posts belonging to the logged-in user
        const userId = req.user._id;
        const posts = await Post.find({  }).populate('user').exec();

        // Render the home page with the fetched posts data and title
        res.render('home', { title: 'Home', posts: posts });
    } catch (err) {
        console.log('Error in fetching posts:', err);
        return res.status(500).send('Error in fetching posts');
    }
};
