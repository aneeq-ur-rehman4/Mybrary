const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Book = require("../models/book");
const Author = require("../models/author");

const uploadPath = path.join("public", Book.coverImageBasePath);

const imageMimeTypes = ["images/jpeg", "images/png", "images/gif"];

// set storage
let storage = multer.diskStorage({
  destination: uploadPath,
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + "." + file.mimetype.split("/")[1]
    );
  },
  // fileFilter:
});

const upload = multer({
  dest: uploadPath,
  fileFilter: (req, file, callback) => {
    callback(null, imageMimeTypes.includes(file.mimetype));
  },
});

// All Books Route
router.get("/", async (req, res) => {
  res.send("All book");
});

// New Book Route
router.get("/new", async (req, res) => {
  renderNewPage(res, new Book());
});

// Create Book Route
router.post("/", upload.single("cover"), async (req, res) => {
  console.log(req)
  const fileName = req.file != null ? req.file.fieldname : null;

  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    publishDate: new Date(req.body.publishDate),
    pageCount: req.body.pageCount,
    coverImageName: fileName,
    description: req.body.description,
  });

  try {
    console.log(book);
    const newBook = await book.save();
    // res.redirect(`books`);
    // res.redirect(`books/${newBook.id}`);
  } catch (error) {
    // console.log(error);
    renderNewPage(res, book, true);
  }
});

async function renderNewPage(res, book, hasError = false) {
  try {
    const authors = await Author.find({});
    const params = {
      authors: authors,
      book: book,
    };

    if (hasError) params.errorMessage = "Error Creating Book";

    res.render("books/new", params);
  } catch (error) {
    res.redirect("/books");
  }
}

module.exports = router;
