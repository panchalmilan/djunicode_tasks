/**
 * Student Info
 * @typedef {Object} Student
 * @property {string} Name - Name of the Student
 * @property {Object.<string, {Maths: number, English: number}>} Score - Score of subjects
 */

/**
 * Formats raw student data
 * @param {string[]} rawStudentData - ["firstName lastName mathsMarks englishMarks", ...]
 * @returns {Student[]} - Array of Student objects sorted in descending order based on the average score.
 */
const dataFormatter = (rawStudentData) =>
  rawStudentData
    // Extracts data from string, returns FORMATTED Object
    .map((student) => {
      const [firstName, lastName, mathsMarks, EnglishMarks] = student.split(' ')
      return {
        Name: `${firstName} ${lastName}`,
        Score: {
          Maths: parseFloat(mathsMarks),
          English: parseFloat(EnglishMarks),
        },
      }
    })
    // Destructure Subject Marks, SORT in DESCENDING order based on AVERAGE score
    .sort(({ Score: stud1 }, { Score: stud2 }) => {
      const avg1 = (stud1.Maths + stud1.English) / 2
      const avg2 = (stud2.Maths + stud2.English) / 2
      return avg2 - avg1
    })

/**
 * Raw Student Data
 * @type {Array<string>}
 */
const rawStudentData = [
  'Rashmil Panchani 99 97',
  'Parag Vaid 95 93',
  'Siddharth Sanghavi 98 100',
]

const formattedData = dataFormatter(rawStudentData)

console.log(formattedData)
