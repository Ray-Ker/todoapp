import express from "express";
import Task from "../model/Task.js";

const router = express.Router();


router.get("/", async (req, res) => {
    const { userId } = req.query;
    const tasks = await Task.find({userId});
    res.json(tasks);
})

router.post("/", async (req, res) => {
    try{
        const {title,dueDate,priority,userId} = req.body;
        const newTask = new Task({title, dueDate, priority, userId});
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
});

router.delete("/:id", async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Tarea eliminada exitosamente" });
});

export default router;