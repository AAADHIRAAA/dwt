const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');



// Route to get the count of logged-in users
// router.get('/users/count', userController.getUsers);

// router.get('/details', userController.getUserDetails);
router.get('/overall-user-statistics/:id',userController.getOverallUserStatistics);
router.get('/user-today-statistics/:id',userController.getDailyUserStatistics);
router.get('/view-books/:id',userController.viewBooks);
module.exports = router;