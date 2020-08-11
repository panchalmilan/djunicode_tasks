const express = require('express')

// creating router
const router = express.Router()

// importing controller functions
const {
  compareAllStudents,
  getAllStudents,
  addStudentPage,
  createStudent,
  getStudent,
  getEditStudent,
  updateStudent,
  deleteStudent,
} = require('../controllers/students')

router.route('/compare').get(compareAllStudents)

router.route('/all').get(getAllStudents)

router.route('/add').get(addStudentPage).post(createStudent)

router.route('/edit/:slug').get(getEditStudent)

router.route('/:slug').get(getStudent).put(updateStudent).delete(deleteStudent)

// exporting router // imported at server
module.exports = router
