const express = require("express");
const app = express();
const Book = require("../models/Book.js");
const User = require("../models/User");
const Tag = require("../models/Tag");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
app.use(cookieParser());

const formidable = require("express-formidable");
app.use(
  formidable({
    multiples: true, // request.files to be arrays of files
  })
);

const path = require('path');
const fileSystem = require("fs");

app.use("/bookContent", express.static(__dirname + "/bookContent"));

//moves the $file to $dir2
var moveFile = (file, dir2)=>{
  
    //gets file name and adds it to dir2
    var f = path.basename(file);
    var dest = path.resolve(dir2, f);
  
    fileSystem.rename(file, dest, (err)=>{
      if(err) throw err;
      else console.log('Successfully moved');
    });
  };


//callback for upload book images
// function callbackFileUpload(
//   bookID,
//   images,
//   index,
//   savedPaths = [],
//   success = null
// ) {
//   const self = this;

//   if (images.length > index) {
//     fileSystem.readFile(images[index].path, function (error, data) {
//       if (error) {
//         console.error(error);
//         return;
//       }

//       const filePath = `bookContent/${bookID}/` + images[index].name;

//       fileSystem.writeFile(filePath, data, async function (error) {
//         if (error) {
//           console.error(error);
//           return;
//         }

//         savedPaths.push(filePath);

//         if (index == images.length - 1) {
//           success(savedPaths);
//         } else {
//           index++;
//           callbackFileUpload(bookID, images, index, savedPaths, success);
//         }
//       });

//       fileSystem.unlink(images[index].path, function (error) {
//         if (error) {
//           console.error(error);
//           return;
//         }
//       });
//     });
//   } else {
//     success(savedPaths);
//   }
// }

const getAllBook = async (req, res) => {
  const books = await Book.find();

  if (!books) return res.status(204).json({ message: "No book found!" });

  res.json(books);
};

const getByID = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ message: "Book ID required!" });
  }

  const book = await Book.findById({ _id: req.params.id }).exec();

  if (!book) {
    return res
      .status(204)
      .json({ message: `Book does not exist with ${req.body.id}!` });
  }

  res.json(book);
};

const deleteBook = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ message: "Book ID required!" });
  }

  const book = await Book.findOneAndDelete({ _id: req.params.id }).exec();

  res.json({ success: true, message: "deleted" });
  // const delte = await Book.deleteMany()
};

const updateBook = async (req, res) => {
  if (!req.body.id) {
    return res.status(400).json({ message: "Book ID required!" });
  }

  const book = await Book.findOne({ _id: req.body.id }).exec();

  if (!book) {
    return res
      .status(204)
      .json({ message: `User does not exist with ${req.body.id}!` });
  }

  const updateData = req.body;

  const bookUpdated = await Book.findOneAndUpdate(
    { _id: req.body.id },
    updateData,
    {
      new: true,
    }
  );

  res.status(200).json(bookUpdated);
};

const addBook = async (req, res) => {
  console.log("body", req.body);
  console.log("images", req.files)
  const newBook = req.body;
  const uploadedImages = req.files.images;
  console.log(uploadedImages);
  const book = await Book.findOne({ name: newBook.name }).exec();

  if (book != null) {
    return res
      .status(409)
      .json({ message: "A book with this name is already exist!" });
  }

  try {
    const result = await Book.create({
      name: newBook.name,
      image: "",
      price: newBook.price,
      description: newBook.description,
      tag: newBook.tag,
      author: newBook.author,
      artist: newBook.artist,
      publisher: newBook.publisher,
      pageCount: newBook.pageCount,
      saleRate: newBook.saleRate,
      content: {},
    });
    const updateResult = await Tag.updateMany(
      { name: { $in: newBook.tag } },
      { $push: { books: result._id } }
    );

    const bookID = result._id;

    const bookContentFolder = "./bookContent";
    try {
      if (!fileSystem.existsSync(bookContentFolder)) {
        fileSystem.mkdirSync(bookContentFolder);
        console.log("bookContent folder added");
      }
    } catch (err) {
      console.error(err);
    }

    const folderName = `./bookContent/${bookID}/`;
    try {
      if (!fileSystem.existsSync(folderName)) {
        fileSystem.mkdirSync(folderName);
        console.log(`content folder for bood ID: ${bookID} added`);
      }
    } catch (err) {
      console.error(err);
    }
    
    moveFile(`./uploads/cover.bmp`, folderName)

    for (let i = 0; i< uploadedImages.length-1; i++) {
       // const temp = uploadedImages[i+1];
       // console.log(temp);
        const uploadedPath = `./uploads/${i+1}.bmp`;
        // console.log(uploadedPath);
        // console.log(folderName);
        moveFile(uploadedPath, folderName);
    }

    const content = {};
    for (let i = 0; i < uploadedImages.length-1; i++) {
      content[i + 1] = `/bookContent/${bookID}/${i + 1}`;
    }

    // callbackFileUpload(bookID, images, 0, [], async function (savedPaths) {
    //   await Book.findOneAndUpdate(
    //     {
    //       _id: bookID,
    //     },
    //     {
    //       cover: `./bookContent/${bookID}/cover`,
    //       content: content,
    //     }
    //   );

    //   result.send("Images has been uploaded.");
    // });
    // console.log("----");

    // console.log("content of images: " +images);
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
};
const addLike = async (req, res) => {
  const token = req.cookies.token;
  const decoded = jwt.verify(token, "thisisourwebsite!");
  const userId = decoded.userId;
  const bookId = req.params.id;

  try {
    const updateBook = await Book.findOneAndUpdate(
      { _id: bookId },
      { $inc: { countLike: 1 } }
    );

    const updateUser = await User.findByIdAndUpdate(
      { _id: userId },
      { $push: { favorbooks: bookId } },
      { new: "true" }
    );

    const newtoken = jwt.sign(
      {
        userId: updateUser._id,
        role: updateUser.role,
        username: updateUser.username,
        image: updateUser.image,
        favorbooks: updateUser.favorbooks,
      },
      "thisisourwebsite!"
    );
    res.cookie("token", newtoken);
    res.json(updateBook);
  } catch (error) {
    res.json(error);
  }
};
const subLike = async (req, res) => {
  const token = req.cookies.token;
  const decoded = jwt.verify(token, "thisisourwebsite!");
  const userId = decoded.userId;
  const bookId = req.params.id;

  try {
    const updateBook = await Book.findByIdAndUpdate(
      { _id: bookId },
      { $inc: { countLike: -1 } }
    );

    const updateUser = await User.findByIdAndUpdate(
      { _id: userId },
      { $pull: { favorbooks: bookId } },
      { new: "true" }
    );

    const newtoken = jwt.sign(
      {
        userId: updateUser._id,
        role: updateUser.role,
        username: updateUser.username,
        image: updateUser.image,
        favorbooks: updateUser.favorbooks,
      },
      "thisisourwebsite!"
    );
    res.cookie("token", newtoken);
    res.json(updateBook);
  } catch (error) {
    res.json(error);
  }
};

// //pagination
// const bookPage = async (req, res) => {
//     var aggregateQuery =Book.aggregate();
//     const page = req.params.page;
//   Book.aggregatePaginate(aggregateQuery, { page: page, limit: 10 }, function(
//     err,
//     result
//   ) {
//     if (err) {
//       console.err(err);
//     } else {
//       res.json(result);
//     }
//   });
// }

module.exports = {
  getAllBook,
  getByID,
  deleteBook,
  updateBook,
  addBook,
  // bookPage,
  addLike,
  subLike,
};
