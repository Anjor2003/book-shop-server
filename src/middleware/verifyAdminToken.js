const jwt = require("jsonwebtoken");

const verifyAdminToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).send({ message: "Acceso Denegado. Token no proporcionado" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).send({ message: "Token inválido" });
    }

    if (decoded.role !== "admin") { 
      return res.status(403).send({ message: "Acceso no autorizado" });
    }

    req.user = decoded;
    next();
  });
};

module.exports = verifyAdminToken;