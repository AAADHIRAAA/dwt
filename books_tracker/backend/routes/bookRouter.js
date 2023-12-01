const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.post('/save-book-data', bookController.addBook);

router.get('/overall-statistics', bookController.getOverallStatistics);
router.get('/statistics-for-date', bookController.getStatisticsForDate);
router.get('/statistics-prev-date',bookController.getStatisticsForPreviousDay);
router.get('/leaderboard',bookController.getLeaderboardForCurrentDate);

module.exports = router;