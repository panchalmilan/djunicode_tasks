const colors = require('colors');
const path = require('path');
const Student = require('../models/Student');

// Path
const viewDirPath = path.join(__dirname, '..', 'views');

// @desc - compare all students
// @route - GET /student/compare
exports.compareAllStudents = async (req, res) => {
  res.render(path.join(viewDirPath, 'compare.ejs'), { path: req.path });
};

// @desc - reads all students
// @route - GET /student/all
exports.getAllStudents = async (req, res) => {
  try {
    console.log(req.path);
    const students = await Student.find().sort({ average: 'desc' });
    res.status(200).render(path.join(viewDirPath, 'allStudents.ejs'), {
      students,
      path: req.path,
    });
  } catch (err) {
    res.status(400).send(err); // bad request
  }
};

// @desc - get add student form page
// @route - GET /student/add
exports.addStudentPage = (req, res) => {
  res
    .status(200)
    .render(path.join(viewDirPath, 'addStudent.ejs'), { path: req.path });
};

// @desc - create new Student
// @route - POST /student/add/
exports.createStudent = async (req, res) => {
  try {
    console.log(req.body);
    const _stud = new Student(req.body);
    const student = await _stud.save();
    // created
    res.status(201).redirect(`/student/${student.slug}`);
  } catch (err) {
    res.status(400).send(err); // bad request
  }
};

// @desc - read single student
// @route - GET /student/:slug
exports.getStudent = async (req, res) => {
  try {
    const student = await Student.findOne({ slug: req.params.slug });
    res.status(200).render(path.join(viewDirPath, 'singleStudent.ejs'), {
      student,
      path: req.path,
    });
  } catch (err) {
    res.send(err);
  }
};

// @desc - get edit student page
// @route - PUT /student/edit/:slug
exports.getEditStudent = async (req, res) => {
  try {
    const student = await Student.findOne({ slug: req.params.slug });
    res
      .status(200)
      .render(path.join(viewDirPath, 'updateStudent.ejs'), { student });
  } catch (err) {
    res.send(err);
  }
};

// @desc - update single student
// @route - PUT /student/:slug
exports.updateStudent = async (req, res) => {
  try {
    const _update = {
      english: req.body.english,
      maths: req.body.maths,
      average: req.body.average,
      modifiedAt: Date(),
    };
    console.log(_update);
    const _stud = await Student.findOneAndUpdate(
      { slug: req.params.slug },
      _update,
      { new: true }
    );
    console.log('New Student'.bgMagenta);
    console.log(_stud);
    res.redirect(`/student/${req.params.slug}`);
  } catch (err) {
    res.send(err);
  }
};

// @desc - delete single student
// @route - DELETE /student/:slug
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findOne({ slug: req.params.slug });
    await Student.findByIdAndDelete(student._id);
    res.redirect('/student/all');
  } catch (err) {
    res.send(err);
  }
};
