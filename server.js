const express = require('express');
const app = express();
const db = require("./db"); // Import the database connection
require('dotenv').config();  //here initialize a config file so we use dotenv to mangage configration.
const passport = require('./auth'); //import for the authentication

//follwing 2 lines is important
const bodyparser = require('body-parser');

app.use(bodyparser.json());
const PORT = process.env.PORT || 3000;
// Start the server
app.listen(PORT, () => {
    // console.clear();
    console.log("Listening on Port 3000");
});


//Middleware function
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Requet made to : ${req.originalUrl}`);
    next(); //move on to the next phase.
}

app.use(logRequest);







app.use(passport.initialize());
const localAuthMiddleWare = passport.authenticate("local", { session: false });
// Basic route
app.get('/', function (req, res) {
    res.send("Welcome to My Hotel.. How can I help you?");
});


//import the router file
const personRoutes = require("./routes/personRoutes")
app.use('/person', personRoutes);


const menuItemRoutes = require("./routes/menuItemRoutes") //import the router file
app.use('/menu', menuItemRoutes);


