const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;

const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

// Use for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport_local_strategys');
const MongoStore = require('connect-mongo');

const sassMiddleware=require('node-sass-middleware');


app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle:'extended',
    prefix:'/css'
}));

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('./assets'));
app.use(expressLayouts);

// Extract style and script from subpages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// Setup the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Setup session middleware
const store = MongoStore.create({
    mongoUrl: 'mongodb://localhost:27017/codeial_development', // replace with your MongoDB connection URL
    collectionName: 'sessions', // Specify the collection name for storing sessions
    autoRemove: 'disabled' // Disable automatic session expiration
});

store.on('error', function(error) {
    console.error('Session store error:', error);
});

app.use(session({
    name: 'codeial',
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 100 * 60 * 100
    },
    store: store // Use MongoDBStore for session storage
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// Use express routes
app.use('/', require('./routes'));

app.listen(port, function(err) {
    if (err) {
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
