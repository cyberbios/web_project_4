const configClasses = {
  formSelector: ".form",
  inputSelector: ".form__input",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
};

/**
 * Show error message under input
 * @param {string} formElement
 * @param {string} inputElement
 * @param {object} config
 */
const showInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(config.errorClass);
};

/**
 * Hide error message under input
 * @param {string} formElement
 * @param {string} inputElement
 * @param {object} config
 */
const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = "";
};

/**
 * Check input for errors and show/hide error message
 * @param {string} formElement
 * @param {string} inputElement
 * @param {object} config
 */
const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

/**
 * If form exist on the modal, hide all inputs error
 * @param {string} modal
 */
const checkAllInputsError = (form) => {
  const inputList = Array.from(
    form.querySelectorAll(configClasses.inputSelector)
  );
  inputList.forEach((inputElement) => {
    checkInputValidity(form, inputElement, configClasses);
  });
};

/**
 * Check all inputs for errors
 * @param {array} inputList
 * @returns boolean
 */
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

/**
 * Change status of button (active/inactive)
 * @param {array} inputList - array with iputs in form
 * @param {string} buttonElement - button element ('submit')
 * @param {object} config - tag classes
 */
const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

/**
 * Set validation check on the form
 * @param {*} formElement
 * @param {*} config
 */
const setEventListeners = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

/**
 * Add validation on all forms
 * @param {object} config
 */
const enableValidation = (config) => {
  const fieldsetList = Array.from(
    document.querySelectorAll(config.formSelector)
  );
  fieldsetList.forEach((fieldset) => {
    setEventListeners(fieldset, config);
  });
};

enableValidation(configClasses);
