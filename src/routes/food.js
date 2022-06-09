"use strict";
const express = require("express");
const { FoodTable } = require("../models/index");
const FoodRouter = express.Router();

FoodRouter.get("/food", getFood);
FoodRouter.get("/food/:id", getOneFood);
FoodRouter.post("/food", createFood);
FoodRouter.put("/food/:id", updateFood);   
FoodRouter.delete("/food/:id", deleteFood);

async function getFood(req, res) {
    const allFood = await FoodTable.read();
    res.status(200).json(allFood);
}
async function getOneFood(req, res) {
    const food_id = parseInt(req.params.id);
    let foodName = await FoodTable.read(food_id);
    res.status(200).json(foodName);
}
async function createFood(req, res) {
    let newFood = req.body;
    let addFood = await FoodTable.create(newFood);
    res.status(201).json(addFood);
}
async function updateFood(req, res) {
    let food_id = parseInt(req.params.id);
    let updateFood = req.body;
    let foundFood = await FoodTable.read(food_id);
    if (foundFood) {
        let updatedFood = await foundFood.update(updateFood);
        res.status(201).json(updatedFood);
    } else {
        res.status(404);
    }
}
async function deleteFood(req, res) {
    let food_id = parseInt(req.params.id);
    let deleteFood = await FoodTable.delete(food_id);
    res.status(204).json(deleteFood); 
}

module.exports = FoodRouter;