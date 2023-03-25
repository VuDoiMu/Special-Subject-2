const Book = require('../models/Book.js');
const Order = require('../models/Order');

// function oneMonthTillNow(date) {
//     var targetMonth = date.getMonth() - 1;
//     date.setMonth(targetMonth);
//     if(date.getMonth() !== targetMonth % 12) {
//         date.setDate(0); // last day of previous month
//     }
//     return date;
// }


// const getTop10Seller = async (req, res) => {
//     const currentDate = Date.now();
//     const oneMonthOrders = await Order.find({ updatedDate: { $gte: oneMonthTillNow(currentDate), $lte: Date.now() }});

//     const allCarts = [];
//     for (let i = 0; i <oneMonthOrders.length; i++) {
//         allCarts.push(oneMonthOrders[i].cart);
//     }
//     const bookList = [];
   
//     for (let i = 0; i <allCarts.length; i++) {
//         for (let j =0; j<allCarts[i].length; j++) {
//             const thisCart = allCarts[i];
//             if(!bookList.includes(thisCart[j])){
//                 bookList.push(thisCart[j]);
//             }
//         }
//     }

//     let purchasedTime = []; 
//     for (let i = 0; i< bookList.length; i++) {
//         purchasedTime.push(0);
//     }

//     for (let i = 0; i <allCarts.length; i++) {
//         for (let j = 0; j <allcart[i].length; j++) {
//             const thisCart = allCart[i];
//             const pos = bookList.indexOf(thisCart[j]);
//             purchasedTime[pos]++;
//         }
//     }

//     let purchaseList = [];

//     for (let i = 0; i< bookList.length; i++) {
//         purchaseList.push([bookList[i], purchaseList[i]]);
//     }

//     for (let i = 0; i<purchaseList.length; i++) {
//         for (let j = 1; j<purchaseList.length-1; j++) {
//             const temp1 = purchaseList[i];
//             const temp2 = purchaseList[j];
//             if (temp1[1] < temp2[1] ) {
//                 purchaseList[i] = temp2;
//                 purchaseList[j] = temp1;
//             }
//         }
//     }

//     let result = []; 
//     for (let i = 0; i<10; i++) {
//         const temp = purchaseList[i];
//         const book = await Book.findOne({ _id: temp[0]});
//     }
    
//     res.status(200).json(result);

// }

  
const topSell = async ( req, res) => {
    try{
        const books = await Book.find().sort({ countSale: -1 }).limit(5);
        res.json({success : true, books})
    }catch(error){
        res.json({success : false, message:"false"})
    }
}

const topLike = async (req, res) => {
    try{
    const books = await Book.find().sort({ countLike: -1 }).limit(5).exec();
      res.json({ success: true, books: books });
    }catch(error){
        res.json({success : false, message:"false"})
    }
  }

module.exports = {
    topSell,
    topLike
};