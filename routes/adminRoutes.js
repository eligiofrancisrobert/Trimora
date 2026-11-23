const router = require('express').Router();
const { getAdminData } = require('../controllers/adminController');

router.get('/', getAdminData);

module.exports = router;