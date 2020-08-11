let PORT = 3000;

// get all student data
const getData = async () => {
  try {
    const studentsResp = await axios.get(
      `http://127.0.0.1:${PORT}/api/student/all`
    );
    return studentsResp.data;
  } catch (err) {
    return new Error('Error requesting endpoint');
  }
};

// formats studentsArr into student name, english Marks, maths Marks
// used to label in chart
const formatData = (studentsArr) => {
  // Sorting alphabetically using firstName and LastName
  studentsArr.sort((a, b) => {
    const s1FullName = a.firstName + ' ' + a.lastName;
    const s2FullName = b.firstName + ' ' + b.lastName;
    const x = s1FullName.toLowerCase();
    const y = s2FullName.toLowerCase();
    if (x > y) return 1;
    else if (x < y) return -1;
    return 0;
  });

  const fullNameArr = [];
  const englishMarksArr = [];
  const mathsMarksArr = [];

  studentsArr.forEach((student) => {
    fullNameArr.push(student.firstName + ' ' + student.lastName);
    englishMarksArr.push(student.english);
    mathsMarksArr.push(student.maths);
  });
  return { fullNameArr, englishMarksArr, mathsMarksArr };
};

// uses chart.js library to make chart using student info
const makeChart = (fullNameArr, englishMarksArr, mathsMarksArr) => {
  new Chart(document.getElementById('bar-chart'), {
    type: 'bar',
    data: {
      // students
      labels: fullNameArr,
      datasets: [
        {
          label: 'English',
          backgroundColor: '#1a688a',
          // students english marks
          data: englishMarksArr,
        },
        {
          label: 'Maths',
          backgroundColor: '#9e3f03',
          // students maths marks
          data: mathsMarksArr,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: 'Studets Marks (out of 100) batch 2020',
      },
      scales: {
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: 'Students',
            },
          },
        ],
        yAxes: [
          {
            gridLines: {
              zeroLineColor: 'black',
            },
            ticks: {
              min: 0,
              max: 100,
              stepSize: 10,
            },
            scaleLabel: {
              display: true,
              labelString: 'Marks',
            },
          },
        ],
      },
    },
  });
};
// change width if more than 10 students

const controller = async () => {
  const studentsArr = await getData();
  const { fullNameArr, englishMarksArr, mathsMarksArr } = formatData(
    studentsArr
  );
  makeChart(fullNameArr, englishMarksArr, mathsMarksArr);
};

controller();
