//cái này check xem cái ng đang dùng có actually own cái truyện đang đọc ko
const User = require("../models/User");

const readAuth = async (req, res, next) => {
    try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, "thisisourwebsite!");
    const userID = decoded.userId;

    const bookID = req.params.id;

    const user = User.findOne({_id: userID}).exec();

    if (!user) {
        return res.status(401).json({success: false, message: "Cannot verify user"})
    }

    
    if (!bookID){
        return res.status(400).json({ 'message': 'Book ID required!'});
       }

    const userInvent = user.inventory;

    if (userInvent.includes(bookID)) {
        next();
    } else {
        return res.status(403).json({success: false, message: "User do not own this book!"})
    }

    } catch (error) {
        res.status(400).json({ success: false, message: "Bad request (cookie)"})
    }
}

module.exports = {
    readAuth
}