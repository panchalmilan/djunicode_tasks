const getAverage = () => {
  let englishMarks = document.getElementById('english-marks').value;
  let mathsMarks = document.getElementById('maths-marks').value;
  if (englishMarks === '') englishMarks = 0;
  if (mathsMarks === '') mathsMarks = 0;
  const averageInput = document.getElementById('average-marks');
  averageInput.value = (parseFloat(englishMarks) + parseFloat(mathsMarks)) / 2;
};
const checkBound = () => {
  let englishMarks = document.getElementById('english-marks').value;
  mathsMarks = document.getElementById('maths-marks').value;
  if (englishMarks === '') englishMarks = 0;
  if (mathsMarks === '') mathsMarks = 0;
  const englishElem = document.getElementById('english-marks');
  if (englishMarks < 0 || englishMarks > 100) {
    englishElem.classList.add('bg-danger');
  } else {
    englishElem.classList.remove('bg-danger');
  }

  const mathsElem = document.getElementById('maths-marks');
  if (mathsMarks < 0 || mathsMarks > 100) {
    mathsElem.classList.add('bg-danger');
  } else {
    mathsElem.classList.remove('bg-danger');
  }
};
