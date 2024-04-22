const Post = require('../models/post')
const Comment =require('../models/comment')
const User = require('../models/user');
module.exports.home = async function(req, res) {
    try {
        // Fetch all comments and populate 'user' field for each comment
        const comments = await Comment.find({}).populate('user').exec();
        
        // Fetch posts and populate 'user' field
        const posts = await Post.find({}).populate('user').exec();

        // Fetch all the user details
        const Users = await User.find({});
        // Populate 'comments' field for each post
        await Post.populate(posts, { path: 'comments', populate: { path: 'user' } });

        // Render the home page with the fetched posts and comments data
        res.render('home', { title: 'Home', posts: posts, comments: comments , User:Users });
    } catch (err) {
        console.log('Error in fetching posts and comments:', err);
        return res.status(500).send('Error in fetching posts and comments');
    }
};