const express = require("express");
const router = express.Router();
const MenuItem = require('../model/menuItem');


//get all menu API.
router.get('/', async (req, res) => {
    try {
        const data = await MenuItem.find();
        console.log("data fetched successfully!");

        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }


})



//post item data.
router.post('/', async (req, res) => {
    try {
        const data = req.body
        const newItme = new MenuItem(data);
        const response = await newItme.save();
        console.log("data Saved");
        res.status(200).json(response);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal sever error" });
    }
})


//parameratrised URL

router.get('/:tasteType', async (req, res) => {
    try {
        const tasteType = req.params.tasteType;
        if (tasteType == 'sweet' || tasteType == 'spicy' || tasteType == 'Mildly Spicy') {
            const response = await MenuItem.find({ taste: tasteType });
            console.log("response Fetched");
            res.status(200).json(response);
        } else {
            res.status(400).json({ error: "Invalid taste type" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });


    }


})




module.exports = router;