const path = require('path')

// importing fucnstions from models/Student
const {
  makeStudent,
  getAllStudents,
  findBySlug,
  findBySlugAndUpdate,
  findBySlugAndDelete,
} = require('../models/Student')

// Path
const viewDirPath = path.join(__dirname, '..', 'views')

// @desc - compare all students
// @route - GET /student/compare
exports.compareAllStudents = async (req, res) => {
  res.render(path.join(viewDirPath, 'compare.ejs'), { path: req.path })
}

// @desc - reads all students
// @route - GET /student/all
exports.getAllStudents = (req, res) => {
  const students = getAllStudents()
  res.status(200).render(path.join(viewDirPath, 'allStudents.ejs'), {
    students,
    path: req.path,
  })
}

// @desc - get add student form page
// @route - GET /student/add
exports.addStudentPage = (req, res) => {
  res
    .status(200)
    .render(path.join(viewDirPath, 'addStudent.ejs'), { path: req.path })
}

// @desc - create new Student
// @route - POST /student/add/
exports.createStudent = (req, res) => {
  const student = makeStudent(req.body)
  if (student.hasOwnProperty('err')) return res.status(400).send(student)
  res.status(201).redirect(`/student/${student.slug}`)
}

// @desc - read single student
// @route - GET /student/:slug
exports.getStudent = (req, res) => {
  const student = findBySlug(req.params.slug)
  res.status(200).render(path.join(viewDirPath, 'singleStudent.ejs'), {
    student,
    path: req.path,
  })
}

// @desc - get edit student page
// @route - PUT /student/edit/:slug
exports.getEditStudent = (req, res) => {
  const student = findBySlug(req.params.slug)
  res
    .status(200)
    .render(path.join(viewDirPath, 'updateStudent.ejs'), { student })
}

// @desc - update single student
// @route - PUT /student/:slug
exports.updateStudent = (req, res) => {
  try {
    const toUpdate = {
      english: req.body.english,
      maths: req.body.maths,
      average: req.body.average,
      modifiedAt: Date(),
    }
    if (parseFloat(toUpdate.average) > 100)
      return res.send('Are you Overachiever ?')
    findBySlugAndUpdate(req.params.slug, toUpdate)
    res.redirect(`/student/${req.params.slug}`)
  } catch (err) {
    res.status(404).send(err)
  }
}

// @desc - delete single student
// @route - DELETE /student/:slug
exports.deleteStudent = (req, res) => {
  try {
    findBySlugAndDelete(req.params.slug)
    res.redirect('/student/all')
  } catch (err) {
    res.status(404).send(err)
  }
}
