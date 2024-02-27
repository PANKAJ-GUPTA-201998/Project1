const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const app = express();
const port = 8000;
app.use(expressLayouts)
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
