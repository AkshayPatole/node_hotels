const mongoose = require("mongoose");
require('dotenv').config();  //here initialize a config file so we use dotenv to mangage configration.

 // Define a MongoDB connection URL
 //const mongoURL = process.env.MONGODB_URL_LOCAL; 
const mongoURL=process.env.MONGODB_URL;
mongoose.connect(mongoURL, {
    ssl: true,  // Enable SSL
    // sslValidate: true,  // Validate certificates
    tlsAllowInvalidHostnames: false,
});

// Get the default connection
const db = mongoose.connection;

// Event when successfully connected
db.on("connected", () => {
    console.log("Connected to MongoDB Server");
});

// Event when disconnected
db.on("disconnected", () => {
    console.log("Disconnected from MongoDB Server");
});

// Event for connection error
db.on("error", (err) => {
    console.log("Error connecting to MongoDB:", err);
});

// Export the database connection
module.exports = db;
