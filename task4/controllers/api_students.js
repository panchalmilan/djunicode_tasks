// importing Student Model
const Students = require('../models/Student');

// exporting controller function // imported at routes/api_students.js

// @desc - read all students
// @route - GET /api/student/all
exports.getAllStudentsJSON = async (req, res) => {
  try {
    const students = await Students.find();
    res.json(students);
  } catch (err) {
    res.send(err);
  }
};

// @desc - read single student
// @route - GET /api/student/:slug
exports.getSingleStudentJSON = async (req, res) => {
  try {
    const student = await Students.findOne({ slug: req.params.slug });
    res.json(student);
  } catch (err) {
    res.send(err);
  }
};
