const mongoose = require("mongoose");
const bcrypt = require('bcrypt'); //import here a bcrypt
//define the person schema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    age: {
        type: Number
    },
    work: {
        type: String,
        enum: ["chef", "waiter", "manager"],
        require: true,
    },
    mobile: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    address: {
        type: String,

    },
    sallary: {
        type: Number,
        require: true,
    },
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
})


// Middleware to hash password before saving
personSchema.pre('save', async function (next) {
    const person = this;

    // If the password is not modified, move to the next middleware
    if (!person.isModified('password')) return next();

    try {
        // Generate salt with 10 rounds
        const salt = await bcrypt.genSalt(10);

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(person.password, salt);

        // Override the plain password with the hashed password
        person.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});

// Method to compare provided password with stored hashed password
personSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        // Compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        
        // Return the comparison result
        return isMatch;
    } catch (error) {
        // Throw the error if something goes wrong
        throw new Error('Error comparing passwords');
    }
};

// Create and export person model
const Person = mongoose.model('Person', personSchema);
module.exports = Person;