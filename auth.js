const LocalStrategy = require('passport-local').Strategy;
const person = require("./model/person");

const passport = require('passport'); //import for the authentication



passport.use(new LocalStrategy(async (username, password, done) => {
    //authnetication logic here 
    try {
        // console.log("Recieved credentials", username, password);

        const user = await person.findOne({ username: username });

        if (!user)
            return done(null, false, { message: "incorrect Username" });

        const isPasswordMatch = await user.comparePassword(password);
        if (isPasswordMatch)
            return done(null, user)
        else
            return done(null, false, { message: "Incorrect Password" })

    } catch (error) {
        return done(error);

    }
}))

module.exports = passport; //export configured passport