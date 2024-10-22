const express = require("express");
const router = express.Router();
const person = require("./../model/person")  //import here person schema

//Get the Person Details
router.get('/', async (req, res) => {
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
router.post('/', async (req, res) => {
    try {
        const data = req.body; //assuming the request body contains the person data.
        // Create new person document using the mongoose model
        const newPerson = new person(data);

        // Save the newPerson to the database
        const response = await newPerson.save();
        console.log("Data saved successfully!");
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

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
