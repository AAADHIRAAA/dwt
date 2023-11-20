const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.post('/save-book-data', bookController.addBook);


// router.put('/update-book-data/:id',bookController.updateBook);



router.get('/overall-statistics', bookController.getOverallStatistics);
router.get('/statistics-for-date', bookController.getStatisticsForDate);

module.exports = router;