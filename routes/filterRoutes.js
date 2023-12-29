const express = require('express');
const router = express.Router();

const {
  getAllFilters
} = require('../controllers/filterController');

router
  .route('/')
  .get(getAllFilters);


module.exports = router;
