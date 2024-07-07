import foodModel from "../models/foodModels.js";
import fs from 'fs';

// Add food items
const addFood = async (req, res) => {
    try {
        let image_filename = req.file.filename; // Assuming req.file contains the uploaded file
        const { name, description, price, category } = req.body;

        const food = new foodModel({
            name,
            description,
            price: Number(price), // Assuming price should be stored as a number
            category,
            image: image_filename
        });

        await food.save();
        res.json({ success: true, message: "Food Added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error adding food" });
    }
};

// List all food items
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error fetching food list" });
    }
};

// Remove food items
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);

        if (!food) {
            return res.status(404).json({ success: false, message: "Food not found" });
        }

        // Delete associated image file
        fs.unlink(`uploads/${food.image}`, (err) => {
            if (err) {
                console.error(err);
            }
        });

        // Delete food item from database
        await foodModel.findByIdAndDelete(req.body.id);

        res.json({ success: true, message: "Food removed successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error removing food" });
    }
};

export { addFood, listFood, removeFood };
