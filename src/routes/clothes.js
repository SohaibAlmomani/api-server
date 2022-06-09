"use strict";
const express = require("express");
const { ClothesTable } = require("../models/index");
const ClothesRouter = express.Router();

ClothesRouter.get("/clothes", getClothes);
ClothesRouter.get("/clothes/:id", getOneClothes);
ClothesRouter.post("/clothes", createClothes);
ClothesRouter.put("/clothes/:id", updateClothes);
ClothesRouter.delete("/clothes/:id", deleteClothes);

async function getClothes(req, res) {
    const allClothes = await ClothesTable.read();
    res.status(200).json(allClothes);
}
async function getOneClothes(req, res) {
    const clothes_id = parseInt(req.params.id);
    let clothesName = await ClothesTable.read(clothes_id);
    res.status(200).json(clothesName);
}
async function createClothes(req, res) {
    let newClothes = req.body;
    let addClothes = await ClothesTable.create(newClothes);
    res.status(201).json(addClothes);
}
async function updateClothes(req, res) {
    let clothes_id = parseInt(req.params.id);
    let updateClothes = req.body;
    let foundClothes = await ClothesTable.read(clothes_id);
    if (foundClothes) {
        let updatedClothes = await foundClothes.update(updateClothes);
        res.status(201).json(updatedClothes);
    } else {
        res.status(404);
    }
}
async function deleteClothes(req, res) {
    let clothes_id = parseInt(req.params.id);
    let deleteClothes = await ClothesTable.delete(clothes_id);
    res.status(204).json(deleteClothes); 
}

module.exports = ClothesRouter;