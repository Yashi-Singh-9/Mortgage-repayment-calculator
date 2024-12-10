document.addEventListener("DOMContentLoaded", () => {
    const mortgageAmountInput = document.getElementById("mortgageAmount");
    const mortgageTermInput = document.getElementById("mortgageTerm");
    const interestRateInput = document.getElementById("intrestRate");
    const repaymentRadio = document.getElementById("repayment");
    const interestOnlyRadio = document.getElementById("intrest");
    const calculateButton = document.getElementById("submit");
    const resetButton = document.getElementById("resetAll");
  
    const initialResultSection = document.querySelector(".initial-result");
    const calculatedResultSection = document.querySelector(".calculated-result");
    const monthlyPaymentElement = document.getElementById("monthly_payment");
    const totalPaymentElement = document.getElementById("total_payment");
  
    const errorColor = "hsl(4, 69%, 50%)"; // @red color from your LESS file
  
    calculateButton.addEventListener("click", () => {
      clearErrors();
  
      // Get inputs and validate
      const mortgageAmount = parseFloat(mortgageAmountInput.value);
      const mortgageTerm = parseInt(mortgageTermInput.value);
      const interestRate = parseFloat(interestRateInput.value);
      let mortgageType = null;
  
      if (repaymentRadio.checked) {
        mortgageType = "repayment";
      } else if (interestOnlyRadio.checked) {
        mortgageType = "interest-only";
      }
  
      let hasErrors = false;
  
      // Validation for Mortgage Amount
      if (isNaN(mortgageAmount) || mortgageAmount <= 0) {
        showError(mortgageAmountInput, "Enter a valid mortgage amount.", ".currency-symbol");
        hasErrors = true;
      }
  
      // Validation for Mortgage Term
      if (isNaN(mortgageTerm) || mortgageTerm <= 0) {
        showError(mortgageTermInput, "Enter a valid mortgage term (in years).", ".term-symbol");
        hasErrors = true;
      }
  
      // Validation for Interest Rate
      if (isNaN(interestRate) || interestRate <= 0) {
        showError(interestRateInput, "Enter a valid interest rate.", ".rate-symbol");
        hasErrors = true;
      }
  
      // Validation for Mortgage Type
      if (!mortgageType) {
        showRadioError("Select a mortgage type.");
        hasErrors = true;
      }
  
      if (hasErrors) return;
  
      // Perform calculations
      const monthlyInterestRate = interestRate / 100 / 12;
      const numberOfPayments = mortgageTerm * 12;
      let monthlyPayment, totalPayment;
  
      if (mortgageType === "repayment") {
        monthlyPayment = 
          (mortgageAmount * monthlyInterestRate) / 
          (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
        totalPayment = monthlyPayment * numberOfPayments;
      } else if (mortgageType === "interest-only") {
        monthlyPayment = mortgageAmount * monthlyInterestRate;
        totalPayment = monthlyPayment * numberOfPayments;
      }
  
      // Update results in the DOM
      monthlyPaymentElement.textContent = `£${monthlyPayment.toFixed(2)}`;
      totalPaymentElement.textContent = `£${totalPayment.toFixed(2)}`;
      initialResultSection.classList.add("hidden");
      calculatedResultSection.classList.remove("hidden");
    });
  
    resetButton.addEventListener("click", () => {
      // Clear all inputs
      mortgageAmountInput.value = "";
      mortgageTermInput.value = "";
      interestRateInput.value = "";
      repaymentRadio.checked = false;
      interestOnlyRadio.checked = false;
  
      // Reset results
      initialResultSection.classList.remove("hidden");
      calculatedResultSection.classList.add("hidden");
  
      // Clear errors
      clearErrors();
    });
  
    function showError(input, message, symbolSelector) {
      const errorContainer = input.parentNode.parentNode.querySelector(".error-message");
      errorContainer.textContent = message;
      errorContainer.style.color = errorColor;
  
      // Add red border to the input
      if (input.tagName === "INPUT") {
        input.style.borderColor = errorColor;
      }
  
      // Add red background to the symbol
      if (symbolSelector) {
        const symbolElement = input.parentNode.querySelector(symbolSelector);
        if (symbolElement) {
          symbolElement.style.backgroundColor = errorColor;
          symbolElement.style.color = "white"; // Adjust text color for better readability
        }
      }
    }
  
    function showRadioError(message) {
      const radioContainer = repaymentRadio.parentNode.parentNode;
      const errorContainer = radioContainer.querySelector(".error-message");
      errorContainer.textContent = message;
      errorContainer.style.color = errorColor;
    }
  
    function clearErrors() {
      // Clear all error messages
      document.querySelectorAll(".error-message").forEach((error) => {
        error.textContent = "";
      });
  
      // Reset input border colors
      document.querySelectorAll("input").forEach((input) => {
        input.style.borderColor = ""; // Reset border color
        input.style.outline = ""; // Reset outline for radio buttons
      });
  
      // Reset background colors for symbols
      document.querySelectorAll(".currency-symbol, .term-symbol, .rate-symbol").forEach((symbol) => {
        symbol.style.backgroundColor = ""; // Reset background
        symbol.style.color = ""; // Reset text color
      });
    }
  });
  