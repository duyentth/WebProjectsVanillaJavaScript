const form = document.querySelector("#form");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const password2 = document.querySelector("#confirm-password");

//form submitting handler
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!checkRequired([username, email, password, password2])) {
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmailValided(email);
    checkPasswordMatched(password, password2);
  }
});

//make sure input value is not empty
const checkRequired = (inputArray) => {
  let isRequired = false;
  inputArray.forEach((input) => {
    if (input.value.trim() === "") {
      isRequired = true;
      showError(input, `${getFieldName(input)} is required.`);
    } else {
      showSuccess(input);
    }
  });
  return isRequired;
};

const getFieldName = (input) => {
  const fieldId = input.id;
  return fieldId.charAt(0).toUpperCase() + fieldId.slice(1);
};
//check whether email is valid
const checkEmailValided = (input) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, `Email is not valid.`);
  }
};
//check whether 2 passwords are matched
const checkPasswordMatched = (input1, input2) => {
  const psw1 = input1.value.trim();
  const psw2 = input2.value.trim();
  if (psw1 !== psw2) {
    showError(input2, `${getFieldName(input2)} is not matched`);
  } else {
    showSuccess(input2);
  }
};

//check the length of value of an input element
const checkLength = (input, min, max) => {
  const length = input.value.length;
  if (length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters.`
    );
  }
  if (length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than or equal ${max} characters.`
    );
  }
};

//show error with a message and color or input element
const showError = (input, message) => {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerHTML = message;
};

//show a success color of an input element
const showSuccess = (input) => {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
};
