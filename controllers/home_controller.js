// module.exports.home = function(req, res){

//     return res.render('home',{
//         title:"Home"
//     })
// }
// const Post = require('../models/post')
// // Function to fetch posts belonging to the logged-in user
// module.exports.home = async function(req, res) {
//     try {
//         // Fetch posts belonging to the logged-in user
//         const userId = req.user._id;
//         const posts = await Post.find({ user: userId });
//         // Render the home page with the fetched posts data and title
//         res.render('home', { title: 'Home', posts: posts });
//     } catch (err) {
//         console.log('Error in fetching posts:', err);
//         return res.status(500).send('Error in fetching posts');
//     }
// };
