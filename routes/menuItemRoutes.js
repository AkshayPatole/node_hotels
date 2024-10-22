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

//update menu data
router.put("/:id", async (req, res) => {
    try {
        const menuId = req.params.id;
        const updatedMenuData = req.body; //data to update

        const reponse = await MenuItem.findByIdAndUpdate(menuId, updatedMenuData, {
            new: true, //return to the updated document
            runValidators: true,
        });
        if (!response) {
            return res.status(400).json({ error: "Menu Not Found" })
        }
        console.log("Menu Updated Successfully!");
        res.status(200).json({ message: "Updated Successfully" })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal server error" });
    }
})


//Delete Person data
router.delete("/:id", async (req, res) => {
    try {
        const menuId = req.params.id;
        const response = await MenuItem.findByIdAndDelete(menuId);
        if (!response) {
            return res.status(404).json({ error: "Person Not Found" });
        } else {
            console.log("Menu deleted successfully!");
            res.status(200).json({ message: "Menu deleted successfully!", response });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})




module.exports = router;