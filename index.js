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

const flash=require('connect-flash');

const customMware = require('./config/middleware')


app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    outputStyle:'extended',
    prefix:'/css',
    // debug:'true'
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
    mongoUrl: 'mongodb://localhost:27017/codeial_development', 
    collectionName: 'sessions', 
    autoRemove: 'disabled' 
});

store.on('error', function(error) {
    console.error('Session store error:', error);
});

app.use(
      session({
        name: "codeial",
        secret: "blahsomething",
        saveUninitialized: false,
        resave: false,
        cookie: {
          maxAge: 1000 * 60 * 100,
        },
        // mongo store is used to store the session cookie in the db
        store: MongoStore.create(
          {
            mongoUrl: "mongodb://localhost/codeial_development",
            autoRemove: "disabled",
          },
          function (err) {
            console.log(err || "connect-mongodb setup ok");
          }
        ),
      })
    );

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);
// Use express routes
app.use('/', require('./routes'));

app.listen(port, function(err) {
    if (err) {
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
console.log("main")
