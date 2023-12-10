const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/overall-user-statistics/:id',userController.getOverallUserStatistics);
router.get('/user-today-statistics/:id',userController.getDailyUserStatistics);
router.get('/view-books/:id',userController.viewBooks);
router.post('/login',userController.handleLogin);
router.post('/issue',userController.handleLogoutAndIssue);
module.exports = router;