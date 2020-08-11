const slugify = require('slugify')

const students = []

class Student {
  constructor(firstName, lastName, english, maths, average) {
    this.firstName = firstName
    this.lastName = lastName
    this.english = english
    this.maths = maths
    this.average = average
    this.createdAt = new Date().toString().split(' ').splice(0, 5).join(' ')
    this.modifiedAt = new Date().toString().split(' ').splice(0, 5).join(' ')

    const _slug = `${this.firstName} ${this.lastName} ${
      Math.floor(Math.random() * 1000) + 1
    }`
    this.slug = slugify(_slug, { lower: true })
  }
}

// create a new student
const makeStudent = (rawData) => {
  const { firstName, lastName, english, maths, average } = rawData
  if (parseFloat(average) > 100) {
    return { err: 'Are you Overachiever ??' }
  }
  const newStudent = new Student(firstName, lastName, english, maths, average)
  students.push(newStudent)
  return newStudent
}

// returns all students in descending order based on average marks
const getAllStudents = () => {
  const studs = [...students]
  return studs.sort((a, b) => b.average - a.average)
}

// returns all students in descending order based on Names
const getAllStudentsNameDesc = () => {
  const studs = [...students]
  return studs.sort((a, b) => {
    const s1Name = a.firstName.toLowerCase() + ' ' + a.lastName.toLowerCase()
    const s2Name = b.firstName.toLowerCase() + ' ' + b.lastName.toLowerCase()
    if (s1Name > s2Name) return 1
    if (s1Name === s2Name) return 0
    return -1
  })
}

// finds students by its slug value
const findBySlug = (slug) => {
  return students.find((student) => student.slug === slug)
}

const findBySlugAndUpdate = (slug, toUpdate) => {
  const studentIndex = students.findIndex((student) => student.slug === slug)
  if (studentIndex == -1) return new Error('Student does not exist')
  for (const [key, value] of Object.entries(toUpdate)) {
    students[studentIndex][key] = value
  }
  return students[studentIndex]
}

const findBySlugAndDelete = (slug) => {
  const studentIndex = students.findIndex((student) => student.slug === slug)
  if (studentIndex == -1) return new Error('Student does not exist')
  students.splice(studentIndex, 1)
}

module.exports = {
  makeStudent,
  getAllStudents,
  getAllStudentsNameDesc,
  findBySlug,
  findBySlugAndUpdate,
  findBySlugAndDelete,
}
