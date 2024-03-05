const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;

const expressLayouts = require('express-ejs-layouts')
const db = require('./config/mongoose');


//use for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport_local_strategys');


app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayouts)
//extract style and script from subpages into the layout
app.set('layout extractStyles',true)
app.set('layout extractScripts',true)



//setup the view engine
app.set('view engine','ejs')
app.set('views','./views')

// 
app.use(session({
    name : 'codeial',
    //todo change it before deployement 
    secret : 'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(100*60*100)
    }
}));
app.use(passport.initialize());
app.use(passport.session());


//use express routes
app.use('/', require('./routes'));

app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});

