// importing fucnstions from models/Student
const { getAllStudentsNameDesc, findBySlug } = require('../models/Student')

// exporting controller function // imported at routes/api_students.js

// @desc - read all students
// @route - GET /api/student/all
exports.getAllStudentsJSON = (req, res) => {
  try {
    const students = getAllStudentsNameDesc()
    res.json(students)
  } catch (err) {
    res.send(err)
  }
}

// @desc - read single student
// @route - GET /api/student/:slug
exports.getSingleStudentJSON = (req, res) => {
  try {
    const student = findBySlug(req.params.slug)
    res.json(student)
  } catch (err) {
    res.send(err)
  }
}
