const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/statistics-for-month',adminController.getStatisticsForCurrentMonth);
router.get('/leaderboard-month',adminController.getLeaderboardForCurrentMonth);
router.get('/viewbooks-month',adminController.viewBooksForCurrentMonth);
module.exports = router;