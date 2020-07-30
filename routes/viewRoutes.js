const express = require('express');

const authController = require('../controllers/authController');
const viewController = require('../controllers/viewController');

const router = express.Router();

router.use(authController.loggedIn);
router.get('/', viewController.base);
router.get('/user', authController.protect, viewController.profile);

module.exports = router;
