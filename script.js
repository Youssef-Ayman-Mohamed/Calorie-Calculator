// Get elements from the page
const weightInput = document.getElementById("weight");
const heightInput = document.getElementById("height");
const ageInput = document.getElementById("age");
const genderSelect = document.getElementById("gender");
const activitySelect = document.getElementById("activity");
const form = document.querySelector(".keto-form");
const caloriesDisplay = document.querySelector("#calories");
const proteinsDisplay = document.querySelector("#Proteins");
const carbsDisplay = document.querySelector("#Carbs");
const bmiDisplay = document.querySelector("#BMI");
const bmiInfoDisplay = document.querySelector("#BMIinfo");

// Calculate values when the form is submitted
form.onsubmit = function (e) {
  e.preventDefault(); 

  // Get input values and parse them to numbers
  const weight = parseFloat(weightInput.value);
  const height = parseFloat(heightInput.value);
  const age = parseFloat(ageInput.value);
  const gender = genderSelect.value;
  const activityLevel = activitySelect.value;

  let BMR = 0;

  // Calculate BMR based on gender
  if (gender === "male") {
    BMR = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
  } else if (gender === "female") {
    BMR = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
  }

  // Determine activity factor and protein per kg based on activity level
  let activityFactor;
  let proteinPerKg;

  switch (activityLevel) {
    case "sedentary":
      activityFactor = 1.2;
      proteinPerKg = 0.8;
      break;
    case "lightly-active":
      activityFactor = 1.375;
      proteinPerKg = 0.8;
      break;
    case "moderately-active":
      activityFactor = 1.55;
      proteinPerKg = 1.2;
      break;
    case "very-active":
      activityFactor = 1.725;
      proteinPerKg = 1.5;
      break;
    case "extra-active":
      activityFactor = 1.9;
      proteinPerKg = 1.5;
      break;
    default:
      activityFactor = 1.0;
      proteinPerKg = 1.0;
  }

  // Calculate daily protein intake
  const dailyProtein = weight * proteinPerKg;

  // Calculate daily caloric needs
  const finalCalories = BMR * activityFactor;

  // Calculate BMI (Body Mass Index)
  const BMI = weight / ((height / 100) * (height / 100));

  // Display the calculated results in the UI
  caloriesDisplay.textContent = `${finalCalories.toFixed(0)} cal`;
  proteinsDisplay.textContent = `${dailyProtein.toFixed(1)} g`;
  carbsDisplay.textContent = `${(finalCalories * 0.1).toFixed(1)} g`;
  bmiDisplay.textContent = `${BMI.toFixed(2)}`;

  // Display BMI information based on BMI value
  if (BMI < 18.5) {
    bmiInfoDisplay.textContent = `You are underweight.`;
    bmiInfoDisplay.style.color = "red";
  } else if (BMI >= 18.5 && BMI <= 24.9) {
    bmiInfoDisplay.textContent = `You have a healthy weight.`;
    bmiInfoDisplay.style.color = "green";
  } else {
    bmiInfoDisplay.textContent = `You are overweight.`;
    bmiInfoDisplay.style.color = "red";
  }
};
