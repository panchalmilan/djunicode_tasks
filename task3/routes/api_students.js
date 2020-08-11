const express = require('express');

// Creating Router
const router = express.Router();

// importing controller functions
const {
  getAllStudentsJSON,
  getSingleStudentJSON,
} = require('../controllers/api_students');

router.route('/all').get(getAllStudentsJSON);

router.route('/:slug').get(getSingleStudentJSON);

// exporting router  // imported at server
module.exports = router;
