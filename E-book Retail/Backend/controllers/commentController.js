const Comment = require("../models/Comment");

// Function to get all comments for a given book
const getBookComments = async (req, res) => {
    try {
        const bookId = req.params.bookId;
        const comments = await Comment.find({ book: bookId }).populate('user');
        res.json(comments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// Function to add a new comment to a book
const addComment = async (req, res) => {
    try {
        const { book, user, content } = req.body;
        const comment = new Comment({
            book: book,
            user: user,
            content,
        });
        const newComment = await comment.save();

        const populatedUser = await newComment.populate('user');
        // const populateComment = {
        //     newComment,
        //     populatedUser
        // }
        // newComment = {...newComment, user: populatedUser};
        // console.log(newComment);
        // console.log("Trong controller");
        res.status(201).json(populatedUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "We got some error" });
    }
};

// Function to edit a comment
const editComment = async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const { content } = req.body;
        const updatedComment = await Comment.findByIdAndUpdate(
            commentId,
            { content },
            { new: true }
        );
        res.json(updatedComment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// Function to delete a comment
const deleteComment = async (req, res) => {
    try {
        const commentId = req.params.commentId;
        await Comment.findByIdAndDelete(commentId);
        res.json({ message: "Comment deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { getBookComments, addComment, editComment, deleteComment };
