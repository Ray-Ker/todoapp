import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/User.js";

const router = express.Router();
const JWT_SECRET = "clave_secreta_super_segura"; // puedes cambiarla

// Registrar usuario
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(400).json({ success: false, message: "El usuario ya existe" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: "1d" });

    res.json({
      success: true,
      message: "Usuario registrado exitosamente",
      token,
      user: { id: newUser._id, username: newUser.username }
    });
  } catch (err) {
    console.error("Error en /register:", err);
    res.status(500).json({ success: false, message: "Error del servidor" });
  }
});

// Iniciar sesión
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user)
      return res.status(400).json({ success: false, message: "Usuario no encontrado" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ success: false, message: "Contraseña incorrecta" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });

    res.json({
      success: true,
      message: "Inicio de sesión exitoso",
      token,
      user: { id: user._id, username: user.username }
    });
  } catch (err) {
    console.error("Error en /login:", err);
    res.status(500).json({ success: false, message: "Error del servidor" });
  }
});

export default router;
