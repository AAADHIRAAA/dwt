const Book = require('../models/bookModel');
const Logs = require('../models/logModel');
const moment = require('moment');

function hourDifference(timeString1, timeString2) {
  // Check if either time string is null
  if (!timeString1 || !timeString2) {
    return null;
  }

  // Parse the time strings using moment with the specified format
  const timeFormat = 'HH:mm:ss';
  const time1 = moment(timeString1, timeFormat);
  const time2 = moment(timeString2, timeFormat);

  // Check if either time string is invalid
  if (!time1.isValid() || !time2.isValid()) {
    return null;
  }

  // Calculate the difference in hours
  return Math.abs(time1.diff(time2, 'hours', true)).toFixed(1);
}
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


const getDailyStatistics = async (req, res) => {
  try {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const startDate = new Date(currentYear, currentMonth - 2, 1);
    const endDate = currentDate
    // console.log(endDate.toLocaleDateString('en-US'));
    const logsData = await Logs.aggregate([
      {
        $match: {
          date: {
            $gte: startDate.toLocaleDateString('en-US'),
            $lte: endDate.toLocaleDateString('en-US')
          }
        }
      },
      {
        $group: {
          _id: {
            userId: '$userId',
            date: `$date`,
          },
          loginTime: {$first: '$loginTime'},
          logoutTime: {$last: '$logoutTime'},
          issue: {$push: '$issues'},
          scribeNumber: {$first: '$scribe_number'},
          username: {$first: '$userName'}
        }
      }
    ]);
    // console.log(logsData);

    const booksData = await Book.aggregate([
      {
        $match: {
          scanned_at: {
            $gte: startDate,
            $lte: endDate
          }
        }
      },
      {
        $group: {
          _id: '$userId',
          totalBooksScanned: { $sum: 1 },
          totalPagesScanned: { $sum: '$pages_scanned' }
        }
      }
    ]);
    // console.log(booksData)
    const mergedData = logsData.map((log) => {
      const bookData = booksData.find((book) => book._id === log._id.userId);
      return {
        userId: log._id.userId,
        date: log._id.date,
        loginTime: log.loginTime,
        logoutTime: log.logoutTime ? log.logoutTime : "Yet To Logout",
        issue: log.issue ? log.issue : "Nil",
        scribeNumber: log.scribeNumber,
        username: log.username,
        booksScanned: bookData ? bookData.totalBooksScanned : 0,
        pagesScanned: bookData ? bookData.totalPagesScanned : 0,
        targetAchieved: bookData ? bookData.totalPagesScanned > 6000 ? "Yes" : "No" : "No",
        workingHours: hourDifference(log.loginTime, log.logoutTime) ? hourDifference(log.loginTime, log.logoutTime) : "Yet To Logout",

      };
    });
    // console.log(mergedData)
    return res.status(200).json(mergedData);

  } catch (error) {
    throw new Error(`Error fetching current month statistics: ${error.message}`);
  }
};

  module.exports = {
  
    getDailyStatistics,  
    getStatisticsForCurrentMonth,
    getLeaderboardForCurrentMonth,
    viewBooksForCurrentMonth,
};