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
        const books = await Book.find().sort({ countSale: -1 });
        res.json(books)
    }catch(error){
        res.json({success : false, message:"false"})
    }
}

const topLike = async (req, res) => {
    try{
    const books = await Book.find().sort({ countLike: -1 });
      res.json( books);
    }catch(error){
        res.json({success : false, message:"false"})
    }
  }

  const topSale = async (req, res) => {
    try{
        const books = await Book.find().sort({ saleRate: -1 });
          res.json(books );
        }catch(error){
            res.json({success : false, message:"false"})
        }
  }
  const priceAsc = async (req, res) => {  // thaps ddens cao
    try{
      const books = await Book.find().sort({ price: 1 });
        res.json(books );
      }catch(error){
          res.json({success : false, message:"false"})
      }
  }
  const priceDesc = async (req, res) => {  
    try{
      const books = await Book.find().sort({ price: -1 });
        res.json(books );
      }catch(error){
          res.json({success : false, message:"false"})
      }
  }
  const nameSort = async (req, res) =>{
    
      try{
        const books = await Book.find().sort({ name: 1 });
          res.json(books );
        }catch(error){
            res.json({success : false, message:"false"})
        }
    
  }
  const dateSort = async (req, res) => {
    
    try{
      const books = await Book.find().sort({ createdDate: 1 });
        res.json(books );
      }catch(error){
          res.json({success : false, message:"false"})
      }
  }
  const searchByName = async (req, res) => {
    const name = req.params.name;
    const regex = new RegExp(name, "i");
    try{
      const results = await Book.find({ name: { $regex: regex } });
      res.json(results)
    }catch(error){
      res.json({success : false, message:"false"})
    }
  }
  const searchBookByAuthor = async (req, res) => {
    const name = req.params.name
    const regex = new RegExp(name, "i");
    try{
      const results = await Book.find({ author: { $regex: regex } });
      res.json(results)
    }catch(error){
      res.json({success : false, message:"false"})
    }    
  }
  
const today = async(req,res) => {
  console.log("today")
  try {
    var today = new Date();
    today.setHours(0, 0, 0, 0); // Đặt giờ về 00:00:00

    const orders = await Order.find({
      createdDate: {
        $gte: today,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000), // Lấy đến 23:59:59
      },
    });
    console.log("orders")
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy order của ngày hôm nay' });
  }
}

const getYesterday = async (req, res) => {
  try {
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);

    var today = new Date();
    today.setHours(0, 0, 0, 0);

    const orders = await Order.find({
      createdDate: {
        $gte: yesterday,
        $lt: today,
      },
    });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy order của hôm qua' });
  }
};

const getLastWeek = async (req, res) => {
  try {
    var lastWeekStart = new Date();
    lastWeekStart.setDate(lastWeekStart.getDate() - 7);
    lastWeekStart.setHours(0, 0, 0, 0);

    var today = new Date();
    today.setHours(0, 0, 0, 0);

    const orders = await Order.find({
      createdDate: {
        $gte: lastWeekStart,
        $lt: today,
      },
    });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy order của tuần trước' });
  }
};

const getLastMonth = async (req, res) => {
  try {
    var lastMonthStart = new Date();
    lastMonthStart.setMonth(lastMonthStart.getMonth() - 1);
    lastMonthStart.setDate(1);
    lastMonthStart.setHours(0, 0, 0, 0);

    var thisMonthStart = new Date();
    thisMonthStart.setDate(1);
    thisMonthStart.setHours(0, 0, 0, 0);

    const orders = await Order.find({
      createdDate: {
        $gte: lastMonthStart,
        $lt: thisMonthStart,
      },
    });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy order của tháng trước' });
  }
};

const divideOrdersByTime = async (req, res) => {
  try {
    const orders = await Order.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdDate' } // Phân chia theo ngày
            // $dateToString: { format: '%Y-%U', date: '$createdDate' } // Phân chia theo tuần
            // $dateToString: { format: '%Y-%m', date: '$createdDate' } // Phân chia theo tháng
          },
          count: { $sum: 1 },
          orders: { $push: '$$ROOT' },
        },
      },
    ]);

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Đã xảy ra lỗi khi phân chia các order' });
  }
};


module.exports = {
    topSell,
    topLike,
    topSale,
    searchByName,
    searchBookByAuthor,
    priceAsc,
    priceDesc, nameSort, dateSort, today, getYesterday, getLastWeek, getLastMonth, divideOrdersByTime
};