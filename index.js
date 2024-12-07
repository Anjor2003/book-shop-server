const express = require("express");
const app = express();
const cors = require("cors");

const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
require("dotenv").config();

// middleware
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173', 'https://book-shop-frontend-indol.vercel.app'],
    credentials: true
}))

// routes
const bookRoutes = require("./src/books/book.route");
const orderRoutes = require("./src/orders/order.route");
const userAuthRoutes = require("./src/users/user.route");
const adminRoutes = require("./src/stats/admin.stats");

app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", userAuthRoutes);
app.use("/api/admin", adminRoutes);

// conexion a la base de datos
async function main() {
  await mongoose.connect(process.env.DATABASE_URL);
  app.use("/", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.send("Bienvenido a la API de BookStore!");
  });
}

main()
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
