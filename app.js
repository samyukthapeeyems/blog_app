//require statements
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
require('dotenv').config();
const multer = require('multer');
const upload = multer({
    dest: './public/images'
});

//express app
const app = express();

mongoose.connect(process.env.MONGOURL, { useNewUrlParser: true, useUnifiedTopology: true });

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



//register view engine
app.set('view engine', 'ejs');


//middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
  });


app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});


//blog routes
app.use('/blogs', blogRoutes);

//for testing img upload
app.get('/upload', (req, res) => {
    res.render('upload', { title: 'upload img' })
})

app.post('/upload', upload.single('image'),(req, res) => {
    console.log(req.file);
    res.send('uploaded')
})


//404 page
app.use((req, res) => {
    console.log(req.url);
    res.status(404).render('404', { title: '404' });
});

//listen for requests
app.listen(5500, () => {
    console.log('server started..');
});

