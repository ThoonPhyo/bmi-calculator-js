// 1. Select the toggle button and the icon
// We use querySelector to find the classes you already have in your HTML
const modeToggle = document.querySelector(".mode-toggle");
const modeIcon = document.querySelector(".mode-icon");

// 2. RUN IMMEDIATELY: Check if the user had Dark Mode saved before
// This makes sure the theme stays active when you refresh the page
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  modeIcon.textContent = "☀️";
}

// 3. THE EVENT: What happens when you click the button
modeToggle.addEventListener("click", function() {
  // Toggle the "dark-mode" class on the body (matches your CSS)
  document.body.classList.toggle("dark-mode");

  // Check if it's currently dark or light to save the setting
  if (document.body.classList.contains("dark-mode")) {
    modeIcon.textContent = "☀️";
    localStorage.setItem("theme", "dark");
  } else {
    modeIcon.textContent = "🌙";
    localStorage.setItem("theme", "light");
  }
});

// === Standard Function  ===
function standardFunction() {
  document.getElementById("standardContainer").style.display = "block";
  document.getElementById("metricContainer").style.display = "none";

  const weight = parseFloat(document.getElementById("weightStandard").value);
  const feet   = parseFloat(document.getElementById("heightStandardFeet").value) || 0;
  const inches = parseFloat(document.getElementById("heightStandardInches").value) || 0;
  const height = feet * 12 + inches;

  // convert to metric (only if values exist)
  if (!isNaN(weight)) document.getElementById("weightMetric").value = (weight / 2.20462).toFixed(1);
  if (height > 0)     document.getElementById("heightMetric").value = (height * 2.54).toFixed(1);

  return { weight, height };
}

// === Metric Function  ===
function metricFunction() {
  document.getElementById("standardContainer").style.display = "none";
  document.getElementById("metricContainer").style.display = "block";

  const kg = parseFloat(document.getElementById("weightMetric").value);
  const cm = parseFloat(document.getElementById("heightMetric").value);

  // convert to standard (only if values exist)
  if (!isNaN(kg)) {
    document.getElementById("weightStandard").value = (kg * 2.20462).toFixed(1);
  }
  if (!isNaN(cm)) {
    const totalInches = cm / 2.54;
    document.getElementById("heightStandardFeet").value   = Math.floor(totalInches / 12);
    document.getElementById("heightStandardInches").value = (totalInches % 12).toFixed(1);
  }

  return { weight: kg, height: cm / 100 };
}

// === Calculate BMI with validation  ===
function calculateBMI() {
  let result, bmi;

  if (document.getElementById("btnstandard").checked) {
    const weight = parseFloat(document.getElementById("weightStandard").value);
    const feet   = parseFloat(document.getElementById("heightStandardFeet").value) || 0;
    const inches = parseFloat(document.getElementById("heightStandardInches").value) || 0;

    if (isNaN(weight) || weight <= 0) { alert("Please enter a valid weight."); return; }
    if (weight > 1400)                { alert("Weight value is too high."); return; }
    if (feet <= 0 && inches <= 0)     { alert("Please enter a valid height."); return; }
    if (feet > 9)                     { alert("Feet value is too high."); return; }
    if (inches >= 12)                 { alert("Inches must be less than 12."); return; }

    result = standardFunction();
    bmi = (result.weight / (result.height * result.height)) * 703;

  } else {
    const kg = parseFloat(document.getElementById("weightMetric").value);
    const cm = parseFloat(document.getElementById("heightMetric").value);

    if (isNaN(kg) || kg <= 0) { alert("Please enter a valid weight."); return; }
    if (kg > 635)             { alert("Weight value is too high."); return; }
    if (isNaN(cm) || cm <= 0) { alert("Please enter a valid height."); return; }
    if (cm > 272)             { alert("Height value is too high."); return; }

    result = metricFunction();
    bmi = result.weight / (result.height * result.height);
  }

  document.getElementById("bmiValue").textContent    = bmi.toFixed(2);
  document.getElementById("bmiCategory").textContent = getBMICategory(bmi);
}

// === BMI Category ===
function getBMICategory(bmi) {
  const card = document.querySelector(".card");

  // reset all category classes first
  card.classList.remove("underweight", "normal", "overweight", "obese");

  if (bmi < 18.5) { card.classList.add("underweight"); return "Underweight"; }
  if (bmi < 24.9) { card.classList.add("normal");      return "Normal weight"; }
  if (bmi < 29.9) { card.classList.add("overweight");  return "Overweight"; }
                    card.classList.add("obese");        return "Obese";
}