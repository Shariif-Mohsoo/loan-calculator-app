//listen for submit
document.getElementById("loan-form").addEventListener("submit", (e) => {
  //Hide Results
  document.getElementById("results").style.display = "none";
  //Show loader
  document.getElementById("loading").style.display = "block";

  //calculate results
  setTimeout(calculateResults, 2000);

  e.preventDefault();
});

//calculate results
function calculateResults() {
  //   console.log("Listening....");

  //UI VARIABLES
  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");
  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");
  //   console.log(
  //     amount,
  //     interest,
  //     years,
  //     monthlyPayment,
  //     totalInterest,
  //     totalPayment
  //   );
  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);

    //show the results
    document.getElementById("results").style.display = "block";
  } else {
    showError("Please Check Your Numbers");
  }
  //hide the loader
  document.getElementById("loading").style.display = "none";
}

//SHOW ERROR
function showError(err) {
  //Create a div
  const errorDiv = document.createElement("div");
  //Get elements
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  //Add class
  errorDiv.className = "alert alert-danger";

  //create the text node and append it to the div
  errorDiv.appendChild(document.createTextNode(err));

  //Insert error before heading
  card.insertBefore(errorDiv, heading);

  //Clear error after 3 seconds
  setTimeout(() => {
    document.querySelector(".alert").remove();
  }, 3000);
}
