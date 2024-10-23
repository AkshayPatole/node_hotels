const express = require("express");
const router = express.Router();
const person = require("./../model/person")  //import here person schema
const { jwtAuthMiddleware, generateToken } = require('./../jwt');
//Get the Person Details
router.get('/', jwtAuthMiddleware, async (req, res) => {
    try {
        const data = await person.find();
        console.log("Data fetched successfully!");
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Post the person data.
router.post('/signup', async (req, res) => {
    try {
        const data = req.body; //assuming the request body contains the person data.
        // Create new person document using the mongoose model
        const newPerson = new person(data);

        // Save the newPerson to the database
        const response = await newPerson.save();
        console.log("Data saved successfully!");

        const payload = {
            id: response.id,
            username: response.username
        }
        console.log(JSON.stringify(payload));
        const token = generateToken(payload);
        console.log("Token is : ", token);
        res.status(200).json({ response: response, token: token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//login route
router.post("/login", async (req, res) => {
    try {
        //extract username and password
        const { username, password } = req.body;

        //find the user by usrename
        const user = await person.findOne({ username: username });

        //if the user does not exist and password does not match, return error
        if (!user || !(await user.comparePassword(password))) {
            return res.status(404).json({ error: "invalid Username and password" })
        }
        //generate token
        const payload = {
            id: user.id,
            username: user.username
        }

        const token = generateToken(payload);

        //return token as a response
        res.json({ token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "invernal server error" });

    }
})


//profile route
router.get("/profile", jwtAuthMiddleware, async (req, res) => {
    try {
        const userData = req.user;
        console.log("User Data", +userData);
        const userId = userData.id;
        const user = await person.findById(userId);

        res.status(200).json({ user });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "invernal server error" });
    }
})



// Parameterized URL
router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType;
        if (workType == 'chef' || workType == 'waiter' || workType == 'Manager') {
            const response = await person.find({ work: workType });
            console.log("Response fetched successfully!");
            res.status(200).json(response);
        } else {
            res.status(400).json({ error: "Invalid Work Type" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Update person data
router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id; //extract the id from url parameter
        const updatedPersonData = req.body; //data to update

        const response = await person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true, //return the updated document
            runValidators: true, //run mongoose validation.
        });

        if (!response) {
            return res.status(404).json({ error: "Person Not Found" });
        }
        console.log("Data updated successfully!");
        res.status(200).json({ message: "Updated successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Delete person data
router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const response = await person.findByIdAndDelete(personId);
        if (!response) {
            return res.status(404).json({ error: "Person Not Found" });
        } else {
            console.log("Person deleted successfully!");
            res.status(200).json({ message: "Person deleted successfully!", response });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});




module.exports = router;
