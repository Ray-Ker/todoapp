import express from "express";
import Task from "../model/Task.js";

const router = express.Router();


router.get("/", async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
})

router.post("/", async (req, res) => {
    try{
        const newTask = new Task(req.body);
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    }
    catch(err){
        res.status(500).json({ message: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Tarea eliminada exitosamente" });
});

export default router;