import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import taskRoutes from "./routes/tasks.js";
import authRoutes from "./routes/auth.js"

const app = express();

// Middleware
app.use(cors());
app.use(express.json());



mongoose.connect("mongodb+srv://edson:contraseña@cluster0.ypavbss.mongodb.net/?appName=Cluster0")
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch(err => console.error("❌ Error al conectar con MongoDB:", err));


// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Servidor backend funcionando 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/tasks", taskRoutes);

// Puerto
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});