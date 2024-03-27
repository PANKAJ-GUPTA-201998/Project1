const Comment = require('../models/comment')
const Post = require('../models/post')
module.exports.Create = async function(req, res) {
    try {
        const NewComment =await Comment.create({
            content: req.body.comment,
            user: req.user._id,
            post:req.body.post_id

        });
        // Find the post to which the comment belongs
        const post = await Post.findById(req.body.post_id);
        if (!post) {
            console.log('Post not found');
            return res.status(404).send('Post not found');
        }
        
        // Push the comment's ID to the comments array of the post
        post.comments.push(NewComment._id);
        await post.save();

        console.log('New Comment:', NewComment);
        return res.redirect('back');
    } catch (err) {
        console.log('Error in creating comment:', err);
        return res.status(500).send('Error in creating post');
    }
};
