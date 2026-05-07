// === Dark / Light Mode Script — place before </body> ===
function toggleMode() {
  const isDark = document.body.classList.toggle("dark-mode");
  document.querySelector(".mode-icon").textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

// Remember preference on page reload
(function () {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    document.querySelector(".mode-icon").textContent = "☀️";
  }
})();

// Standard Function
function standardFunction() {
  document.getElementById("standardContainer").style.display = "block";
  document.getElementById("metricContainer").style.display = "none";

  const weightStandard = parseFloat(
    document.getElementById("weightStandard").value,
  ); // lbs
  const heightStandardFeet = parseFloat(
    document.getElementById("heightStandardFeet").value,
  ); // ft
  const heightStandardInches = parseFloat(
    document.getElementById("heightStandardInches").value,
  ); // in

  const heightInInches = heightStandardFeet * 12 + heightStandardInches;

  return { weight: weightStandard, height: heightInInches }; // ✅ return values
}

// Metric Function
function metricFunction() {
  document.getElementById("standardContainer").style.display = "none";
  document.getElementById("metricContainer").style.display = "block";

  const weightMetric = parseFloat(
    document.getElementById("weightMetric").value,
  ); // kg
  const heightMetric = parseFloat(
    document.getElementById("heightMetric").value,
  ); // m

  return { weight: weightMetric, height: heightMetric }; // ✅ return values
}

// Calculate BMI
function calculateBMI() {
  let weight, height, bmi;

  // ✅ declare variables outside the if blocks so they're accessible below
  if (document.getElementById("btnstandard").checked) {
    ({ weight, height } = standardFunction());
    bmi = (weight / (height * height)) * 703; // ✅ correct imperial formula
  } else if (document.getElementById("btnmetric").checked) {
    ({ weight, height } = metricFunction());
    bmi = weight / (height * height); // metric formula unchanged
  }

  // display the bmi result
  document.getElementById("bmiValue").textContent = `${bmi.toFixed(2)}`;
  bmiCategory.textContent = getBMICategory(bmi);

  // Determine BMI category
  function getBMICategory(bmi) {
    if (bmi < 18.5) {
      return "Underweight";
    } else if (bmi >= 18.5 && bmi < 24.9) {
      return "Normal weight";
    } else if (bmi >= 25 && bmi < 29.9) {
      return "Overweight";
    } else {
      return "Obese";
    }
  }
}
