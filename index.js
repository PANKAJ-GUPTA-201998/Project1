const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const db = require('./config/mongoose')
const app = express();
const port = 8000;
app.use(express.static('./assets'));
app.use(expressLayouts)
app.set('layout extractStyles',true)
app.set('layout extractScripts',true)
app.set('view engine','ejs')
app.set('views','./views')
// use express router
app.use('/', require('./routes'));
//setup view engine
app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
