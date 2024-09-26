// Validator base class
class Validator {
    constructor() {
      this.next = null;
    }
  
    setNext(validator) {
      this.next = validator;
      return validator;
    }
  
    validate(value, errorElement) {
      if (this.next) {
        return this.next.validate(value, errorElement);
      }
      return true;
    }
  }
  
  // NameValidator
  class NameValidator extends Validator {
    validate(value, errorElement) {
      if (!value.name) {
        errorElement.name.textContent = "Name is required";
        errorElement.name.classList.remove("hidden");
        return false;
      }
      if (value.name.length > 100) {
        errorElement.name.textContent = "Name must be under 100 characters";
        errorElement.name.classList.remove("hidden");
        return false;
      }
      if (!/^[a-zA-Z0-9\s]+$/.test(value.name)) {
        errorElement.name.textContent = "Name must not contain special characters";
        errorElement.name.classList.remove("hidden");
        return false;
      }
      errorElement.name.classList.add("hidden");
      return super.validate(value, errorElement);
    }
  }
  
  // AgeValidator
  class AgeValidator extends Validator {
    validate(value, errorElement) {
      if (!value.age) {
        errorElement.age.textContent = "Age is required";
        errorElement.age.classList.remove("hidden");
        return false;
      }
      console.log(value);
      
      const age = parseInt(value.age, 10);
      console.log(age);
      
      if (isNaN(age)) {
        errorElement.age.textContent = "Age must be a number";
        errorElement.age.classList.remove("hidden");
        return false;
      }
      if (age >= 80) {
        errorElement.age.textContent = "Age must be less than 80";
        errorElement.age.classList.remove("hidden");
        return false;
      }
      errorElement.age.classList.add("hidden");
      return super.validate(value, errorElement);
    }
  }
  
  // EmailValidator
  class EmailValidator extends Validator {
    validate(value, errorElement) {
      if (!value.email) {
        errorElement.email.textContent = "Email is required";
        errorElement.email.classList.remove("hidden");
        return false;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value.email)) {
        errorElement.email.textContent = "Invalid email format";
        errorElement.email.classList.remove("hidden");
        return false;
      }
      errorElement.email.classList.add("hidden");
      return super.validate(value, errorElement);
    }
  }
  
  // Form validation logic
  document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const nameInput = document.getElementById("name");
    const ageInput = document.getElementById("age");
    const emailInput = document.getElementById("email");

    const formInfo = {name: nameInput.value, age: ageInput.value, email: emailInput.value}
  
    const nameError = document.getElementById("nameError");
    const ageError = document.getElementById("ageError");
    const emailError = document.getElementById("emailError");

    const formError = {name: nameError, age: ageError, email: emailError}
  
    // Set up chain of responsibility
    const nameValidator = new NameValidator();
    const ageValidator = new AgeValidator();
    const emailValidator = new EmailValidator();
  
    nameValidator.setNext(ageValidator).setNext(emailValidator);
  
    console.log(formInfo);
    
    // Validate the form
    const isValidForm = nameValidator.validate(formInfo, formError);
  
    if (isValidForm) {
      alert("Form submitted successfully!");
    }
  });
  