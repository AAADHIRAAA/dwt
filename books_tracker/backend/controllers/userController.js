// controllers/userController.js

const Book = require('../models/bookModel');
const { startOfDay, endOfDay } = require('date-fns');
const Logs = require('../models/logModel'); 
const AppError = require('../utils/AppError');

const handleLogin = async(req,res) =>{
  try{
  
    const {
        userId,
        userName,
        scannerNumber,
        firstLoginTime,
        date,
    }= req.body;
  console.log(req.body);
  
    const existingLog = await Logs.findOne({ userId:userId, date: date });
    if (!existingLog) {
      await Logs.create({
        userId,
        userName,
        scribe_number: scannerNumber,
        loginTime:firstLoginTime,
        date: date,
      });
    }
    res.status(201).json(
      { message: 'Log created'}
  );
  }
  catch(error){
    const e = new AppError("Error creating a new log: "+error.message, 400);
    e.sendResponse(res)
  }

} 
  

const handleLogoutAndIssue = async (req,res)=> {
  try{
    const currentDate = new Date().toLocaleDateString('en-US');
  const {
    userId,
    logoutTime,
    issues,
  } = req.body;
console.log(req.body);
console.log(currentDate)
const updatedLog =  await Logs.findOneAndUpdate(
    { userId:userId
      , date: currentDate },
    { $set: { logoutTime:logoutTime, issues:issues } },
    { new: true }
  );
  console.log(updatedLog); 
  res.status(201).json(
    { message: 'Log updated'}
  );
  }
  catch(error){
    const e = new AppError("Error storing the issue: "+error.message, 400);
    e.sendResponse(res)
  }
  
}


const getOverallUserStatistics = async (req, res) => {
  const userId=req.params.id;
  
    try {
      const booksScanned = await Book.countDocuments({ userId });
      const pagesScanned = await Book.aggregate([
        { $match: { userId } },
        { $group: { _id: null, totalPages: { $sum: '$pages_scanned' } } },
      ]);
  
      res.json({
        booksScanned,
        pagesScanned: pagesScanned[0]?.totalPages || 0,
      });
    } catch (error) {
      console.error('Error fetching overall user statistics:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  
  // Function to get daily count of books and pages scanned by the user
const getDailyUserStatistics = async (req, res) => {
  const userId=req.params.id;
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to the beginning of the day
  
    try {
      const booksScannedToday = await Book.countDocuments({
        userId,
        scanned_at: { $gte: today },
      });
      const pagesScannedToday = await Book.aggregate([
        {
          $match: {
            userId,
            scanned_at: { $gte: today },
          },
        },
        { $group: { _id: null, totalPages: { $sum: '$pages_scanned' } } },
      ]);
  
      res.json({
        booksScannedToday,
        pagesScannedToday: pagesScannedToday[0]?.totalPages || 0,
      });
    } catch (error) {
      console.error('Error fetching daily user statistics:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
 
  const viewBooks = async (req, res) => {
    try {
      const userId=req.params.id;
      const today = new Date();
      const start = startOfDay(today);
      const end = endOfDay(today);
      const books = await Book.find({ userId: userId ,  scanned_at: { $gte: start, $lte: end },}).exec();
      console.log(books);
      const processed_data = await Promise.all(
        books.map(async (book) => {
          // Copy book attributes to a new object
          const processedBook = { ...book.toObject() };
  
          // Exclude specific fields
          const excludedFields = ['userId', 'userName', 'scanned_at', 'updated_at','_id','__v'];
          for (const field of excludedFields) {
            delete processedBook[field];
          }
  
          return processedBook;
        })
      );
  
      // Return the book details
      return res.status(200).json(
      
          processed_data
      
      );
    } catch (err) {
      // Handle any errors that occur during the process
      console.error(err);
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error',
      });
    }
  };


  

module.exports = {
  handleLogin,
  handleLogoutAndIssue,
  getOverallUserStatistics,
  getDailyUserStatistics,
  viewBooks
 
};
