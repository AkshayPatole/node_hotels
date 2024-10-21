const express = require('express');
const app = express();
const db = require("./db"); // Import the database connection

require('dotenv').config();  //here initialize a config file so we use dotenv to mangage configration.

//follwing 2 lines is important
const bodyparser = require('body-parser');

app.use(bodyparser.json());
const PORT = process.env.PORT || 3000;
// Start the server
app.listen(PORT, () => {
    console.log("Listening on Port 3000");
});

// Basic route
app.get('/', function (req, res) {
    res.send("Welcome to My Hotel.. How can I help you?");
});



const personRoutes = require("./routes/personRoutes") //import the router file
app.use('/person', personRoutes);


const menuItemRoutes = require("./routes/menuItemRoutes") //import the router file
app.use('/menu', menuItemRoutes);


