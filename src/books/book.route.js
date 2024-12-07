const express = require("express");
const Book = require("./book.model");
const {
  postABook,
  getAllBooks,
  getABook,
  updateABook,
  deleteABook,
} = require("./book.controller");
const verifyAdminToken = require("../middleware/verifyAdminToken");
const router = express.Router();

// Post a books
router.post("/create-book", verifyAdminToken, postABook);

// Get all books
router.get("/", getAllBooks);

// Get a book by id
router.get("/:id", getABook);

// Update a book
router.put("/edit/:id",verifyAdminToken, updateABook);

// Delete a book
router.delete("/:id",verifyAdminToken, deleteABook);

module.exports = router;
