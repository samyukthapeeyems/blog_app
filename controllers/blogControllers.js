const Blog = require('../models/blog.js');


const blogIndex = (req, res) => {
    Blog.find().sort({ createdAt: -1 })
    .then(result => {
        res.render('index', {blogs: result, title: 'All blogs'});
    })
    .catch(e => {
        res.status(400).send('failed');
    });
}


const blogDetails = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then(result => {
            res.render('details', { title: 'Blog details' , blog: result })
        })
        .catch(e => {
            res.render('404', { title: 'Blog not found' });
        });
}


const createBlog_get = (req, res) => {
    res.render('create', { title: 'Create a new blog' });
}


const createBlog_post = (req, res) => {
    const blog = new Blog(req.body)
    blog.save()
    .then(result => {
        res.redirect('/blogs');
    })
    .catch(e => {
        console.log(e);
    })
}


const blogDelete = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
    .then(result => {
        res.redirect(303, '/blogs');
    })
    .catch(e => {
        res.render('404', {title : 'Cannot be deleted' });
    });
}



module.exports = {
    blogIndex, 
    blogDetails, 
    createBlog_get, 
    createBlog_post, 
    blogDelete
} 