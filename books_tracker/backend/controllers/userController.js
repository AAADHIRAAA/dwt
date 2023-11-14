// controllers/userController.js
const User = require('../models/userModel');
const Book = require('../models/bookModel');
const AppError = require('../utils/AppError');


// Function to fetch user details by ID
const getUserDetails = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'Unauthorized' });
}
  const userId = req.user.googleId; // Assuming you're using Passport and the user is authenticated

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      fullName: user.fullName,
      email: user.email,
      picture: user.picture,
      // Add more fields as needed
    });
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

  // Function to get overall count of books and pages scanned by the user
const getOverallUserStatistics = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'Unauthorized' });
}
    const userId = req.user.googleId; // Assuming user ID is available in req.user
  
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
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'Unauthorized' });
}
    const userId = req.user.googleId; // Assuming user ID is available in req.user
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
  
  const getUsers = async (req, res) => {
    try {
      const activeSessionsCount = await sessionModel.countDocuments({
        /* Your conditions to check if the session is still valid */
        /* For example, you might compare timestamps and consider sessions within a certain time frame as active. */
      });
      res.json({ count: activeSessionsCount });
    } catch (error) {
      console.error('Error fetching active sessions:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


module.exports = {
  getUserDetails,
  getOverallUserStatistics,
  getDailyUserStatistics,
  getUsers,
};
