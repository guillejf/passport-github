import express from "express";
import { uploader } from "../utils.js";
let pets = [
  { id: "100", name: "pikachu", edad: 14 },
  { id: "101", name: "rintintin", edad: 10 },
  { id: "102", name: "chatran", edad: 1960 },
];

export const petsRouter = express.Router();

petsRouter.get("/", (req, res) => {
  return res.status(200).json({
    status: "success",
    msg: "listado de pets",
    data: pets,
  });
});

petsRouter.post("/", uploader.single("file"), (req, res) => {
  const newPet = req.body;
  newPet.id = (Math.random() * 100000000000).toFixed(0).toString();
  newPet.picture = "http://localhost:3000/" + req.file.filename;
  pets.push(newPet);
  return res.status(201).json({
    status: "success",
    msg: "pet creada",
    data: newPet,
  });
});
