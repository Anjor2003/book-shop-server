const express = require("express");
const User = require("./user.model");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/admin", async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await User.findOne({ username });
    if (!admin) {
      return res.status(404).send({ message: "Administrador no encontrado!" });
    }
    if (admin.password !== password) {
      return res.status(401).send({ message: "Contraseña incorrecta!" });
    }

    const token = jwt.sign(
      { id: admin._id, username: admin.username, role: admin.role },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      },
    );

    return res
      .status(200)
      .json({
        message: "Administrador registrado exitosamente",
        token: token,
        user: {
          username: admin.username,
          role: admin.role,
        },
      });
  } catch (error) {
    console.log("Error al registrar al administrador", error);
    res.status(401).send({ message: "Error al registrar al administrador" });
  }
});

module.exports = router;
