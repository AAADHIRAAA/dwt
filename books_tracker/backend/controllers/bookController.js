
const Book = require('../models/bookModel');
const AppError = require('../utils/AppError');

async function addBook(req, res) {
    try {
        
        console.log(req.body);
       
          const {
            title,
            pages_scanned,
            ID_url,
            author_name,
            publisher_name,
            year,
            isbn,
            language,
            scribe_number,
            userId,
            userName,
          } = req.body;
          
          const newBook = new Book({
            title,
            pages_scanned,
            ID_url,
            author_name,
            publisher_name,
            year,
            isbn,
            language,
            scribe_number,
            userId,
            userName,
          });
          await newBook.save();
        
        res.status(201).json(
            { message: 'New book added'}
        );
    } catch (error) {
        // console.error('Error adding a new book:', error);
        const e = new AppError("Error adding a new book: "+error.message, 400);
        e.sendResponse(res)
    }
}


// Function to fetch overall statistics
const getOverallStatistics = async (req, res) => {
    try {
      const booksScanned = await Book.countDocuments();
      const pagesScanned = await Book.aggregate([{ $group: { _id: null, totalPages: { $sum: '$pages_scanned' } } }]);
      const authorCount = (await Book.distinct('author_name')).length;
      const publisherCount = (await Book.distinct('publisher_name')).length;
  
      res.json({
        booksScanned,
        pagesScanned: pagesScanned[0].totalPages,
        authorCount,
        publisherCount,
      });
    } catch (error) {
      console.error('Error fetching overall statistics:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // Function to fetch statistics for a specific date
  const getStatisticsForDate = async (req, res) => {
    let  currentdate  = new Date();
    try {
      const startOfDay = new Date(currentdate.getFullYear(), currentdate.getMonth(), currentdate.getDate());
      const endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000);
     
      const booksScannedToday = await Book.countDocuments({
          scanned_at: {
              $gte: startOfDay,
              $lt: endOfDay,
          },
      });

      const pagesScannedToday = await Book.aggregate([
          {
              $match: {
                  scanned_at: {
                      $gte: startOfDay,
                      $lt: endOfDay,
                  },
              },
          },
          { $group: { _id: null, totalPages: { $sum: '$pages_scanned' } } },
      ]);

      // Fetch distinct authors and publishers from the previous day
    const distinctAuthors = await Book.distinct('author_name', {
      scanned_at: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
    });

    const distinctPublishers = await Book.distinct('publisher_name', {
      scanned_at: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
    });
      res.json({
          booksScannedToday,
          pagesScannedToday: pagesScannedToday[0]?.totalPages || 0,
          distinctAuthors: distinctAuthors.length,
          distinctPublishers: distinctPublishers.length,
      });
  } catch (error) {
      console.error('Error fetching statistics for date:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
    
  };

  const getStatisticsForPreviousDay = async (req, res) => {
    try {
      let currentDate = new Date();
      // Get the start and end of the previous day
      const startOfPreviousDay = new Date(currentDate);
      startOfPreviousDay.setDate(currentDate.getDate() - 1);
      startOfPreviousDay.setHours(0, 0, 0, 0);
  
      const endOfPreviousDay = new Date(currentDate);
      endOfPreviousDay.setDate(currentDate.getDate());
      endOfPreviousDay.setHours(0, 0, 0, 0);
  
      // Fetch books scanned on the previous day
      const booksScannedPreviousDay = await Book.countDocuments({
        scanned_at: {
          $gte: startOfPreviousDay,
          $lt: endOfPreviousDay,
        },
      });
  
      // Fetch pages scanned on the previous day
      const pagesScannedPreviousDay = await Book.aggregate([
        {
          $match: {
            scanned_at: {
              $gte: startOfPreviousDay,
              $lt: endOfPreviousDay,
            },
          },
        },
        { $group: { _id: null, totalPages: { $sum: '$pages_scanned' } } },
      ]);
  
   
  
      res.json({
        booksScannedPreviousDay,
        pagesScannedPreviousDay: pagesScannedPreviousDay[0]?.totalPages || 0,
      });
    } catch (error) {
      console.error('Error fetching statistics for previous day:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  const getLeaderboardForCurrentDate = async (req, res) => {
    try {
      let currentDate = new Date();
      const startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
      const endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000);
  
      const leaderboardData = await Book.aggregate([
        {
          $match: {
            scanned_at: {
              $gte: startOfDay,
              $lt: endOfDay,
            },
          },
        },
        {
          $group: {
            _id: {
              scribeNumber: '$scribe_number',
              username: "$userName",
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
      const result = leaderboardData.length > 0 ? leaderboardData[0] : null;
      return res.status(200).json(leaderboardData);
    
    } catch (error) {
      console.error('Error fetching leaderboard data for current date:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  

module.exports = {
    addBook,
    getOverallStatistics,
    getStatisticsForDate,
    getStatisticsForPreviousDay,
    getLeaderboardForCurrentDate,
};