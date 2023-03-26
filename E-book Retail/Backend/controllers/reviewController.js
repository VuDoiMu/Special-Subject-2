const Book = require('../models/Book.js');
const Review = require('../models/Review');

  
const reviewing = async ( req, res) => {
    const reviewedBook = req.params.id
    const {reviewText, isRecommended} = req.body
    const token = req.cookies.userInfor;
    try{
        const review = new Review({reviewedBook, reviewer: token.username,isRecommended, reviewText})
        await review.save()
        res.json(review)
    }catch(error){
        res.json({success : false, message:"false"})
    }
}

const updateReview = async (req, res) => {
    const reviewId = req.params.id
    const {reviewText, isRecommended} = req.body
    try{
    const review = await Review.findOneAndUpdate({reviewId}, {isRecommended, reviewText}, {new: "true"})
      res.json(review);
    }catch(error){
        res.json({success : false, message:"false"})
    }
  }

  const deleteReview = async (req, res) => {
    const reviewId = req.params.id
    try{
        const review = await Review.deleteOne(reviewId)
          res.json(review);
        }catch(error){
            res.json({success : false, message:"false"})
        }
  }
  const getReview = async (req, res) => {
    try{
        const review = await Review.find().sort({createdDate: -1})
          res.json(review);
        }catch(error){
            res.json({success : false, message:"false"})
        }
  }
module.exports = {
    reviewing,
    updateReview,
    deleteReview,
    getReview
};