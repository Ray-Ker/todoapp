import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    dueDate: { type: Date },
    priority: { type: String, enum: ['Nula', 'Baja', 'Media', 'Alta'], default: 'Nula' },
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
});

export default mongoose.model("Task", taskSchema);