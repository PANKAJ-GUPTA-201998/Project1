const Post = require('../models/post')
module.exports.create = async function(req, res) {
    try {
        const post = await Post.create({
            content: req.body.content,
            user: req.user._id,

        });
        console.log(post)
        return res.redirect('back');
    } catch (err) {
        console.log('Error in creating post:', err);
        return res.status(500).send('Error in creating post');
    }
};


// Function to fetch posts belonging to the logged-in user
const Comment = require('../models/comment');

module.exports.home = async function(req, res) {
    try {
        // Fetch all comments and populate 'user' field for each comment
        const comments = await Comment.find({}).populate('user').exec();
        // Fetch posts and populate 'user' and 'comments' fields
        const posts = await Post.find({}).populate('user').populate('comments').exec();
        // Render the home page with the fetched posts and comments data
        res.render('home', { title: 'Home', posts: posts, comments: comments });
    } catch (err) {
        console.log('Error in fetching posts and comments:', err);
        return res.status(500).send('Error in fetching posts and comments');
    }
};
