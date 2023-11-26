const Book = require('../models/bookModel');
const AppError = require('../utils/AppError');

const getStatisticsForCurrentMonth = async (req, res) => {
    try {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1; 
  
      const startOfMonth = new Date(currentYear, currentMonth - 1, 1); 
      const endOfMonth = new Date(currentYear, currentMonth, 0); // Last day of the current month
  
      const booksScannedThisMonth = await Book.countDocuments({
        scanned_at: {
          $gte: startOfMonth,
          $lt: endOfMonth,
        },
      });
  
      const pagesScannedThisMonth = await Book.aggregate([
        {
          $match: {
            scanned_at: {
              $gte: startOfMonth,
              $lt: endOfMonth,
            },
          },
        },
        { $group: { _id: null, totalPages: { $sum: '$pages_scanned' } } },
      ]);
  
      const distinctAuthorsThisMonth = await Book.distinct('author_name', {
        scanned_at: {
          $gte: startOfMonth,
          $lt: endOfMonth,
        },
      });
  
      const distinctPublishersThisMonth = await Book.distinct('publisher_name', {
        scanned_at: {
          $gte: startOfMonth,
          $lt: endOfMonth,
        },
      });
  
      res.json({
        booksScannedThisMonth,
        pagesScannedThisMonth: pagesScannedThisMonth[0]?.totalPages || 0,
        distinctAuthorsThisMonth: distinctAuthorsThisMonth.length,
        distinctPublishersThisMonth: distinctPublishersThisMonth.length,
      });
    } catch (error) {
      console.error('Error fetching statistics for current month:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  const getLeaderboardForCurrentMonth = async (req, res) => {
    try {
      const currentDate = new Date();
      const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  
      const leaderboardData = await Book.aggregate([
        {
          $match: {
            scanned_at: {
              $gte: startOfMonth,
              $lt: endOfMonth,
            },
          },
        },
        {
          $group: {
            _id: {
              scribeNumber: '$scribe_number',
            },
            totalBooks: { $sum: 1 },
            totalPages: { $sum: '$pages_scanned' },
            username: { $first: '$userName' },
          },
        },
        {
          $project: {
            username: '$username',
            scribeNumber: '$_id.scribeNumber',
            totalBooks: '$totalBooks',
            totalPages: '$totalPages',
            _id: 0,
          },
        },
      ]);
  
     
      return res.status(200).json(leaderboardData);
    } catch (error) {
      console.error('Error fetching leaderboard data for current month:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  const viewBooksForCurrentMonth = async (req, res) => {
    try {
      const currentDate = new Date();
      const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  
      const books = await Book.find({
        scanned_at: { $gte: startOfMonth, $lte: endOfMonth },
      }).exec();
  
      const processed_data = await Promise.all(
        books.map(async (book) => {
          // Copy book attributes to a new object
          const processedBook = { ...book.toObject() };
            // Extract and format only the date portion of scanned_at field
            if (processedBook.scanned_at instanceof Date) {
                processedBook.scanned_at = processedBook.scanned_at.toISOString().split('T')[0];
            }
          // Exclude specific fields
          const excludedFields = ['userId', 'updated_at', '_id', '__v'];
          for (const field of excludedFields) {
            delete processedBook[field];
          }
  
          return processedBook;
        })
      );
  
      return res.status(200).json(processed_data);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error',
      });
    }
  };
  

  module.exports = {
  
    getStatisticsForCurrentMonth,
    getLeaderboardForCurrentMonth,
    viewBooksForCurrentMonth,
};