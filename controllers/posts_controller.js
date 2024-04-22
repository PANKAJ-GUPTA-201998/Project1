const Post = require('../models/post')
const Comment =require('../models/comment')
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





module.exports.destroy = async function(req, res) {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).send("Post not found");
        }

        if (post.user == req.user.id) {
            // Delete the post
            await post.deleteOne();

            // Delete comments associated with the post
            await Comment.deleteMany({ post: post._id });

            return res.redirect('back');
        } else {
            return res.redirect('back');
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error");
    }
};

