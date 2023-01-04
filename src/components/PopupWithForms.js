import Popup from "./Popup";

class PopupWithForm extends Popup {
  constructor(popupSelector, submitButtonText, handleFormSubmit) {
    super(popupSelector);

    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.querySelector(".form");
    this._submitButton = this._popupForm.querySelector(".form__button");
    this._submitButtonText = submitButtonText;
    this._popupInputs = this._popupForm.querySelectorAll(".form__input");
  }

  _getInputValues() {
    const inputValues = {};

    this._popupInputs.forEach((input) => {
      inputValues[input.name] = input.value;
    });

    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const inputValues = this._getInputValues();
      this._handleFormSubmit(inputValues);
    });
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
  showLoading() {
    this._submitButton.textContent = "Saving...";
  }
  hideLoading() {
    this._submitButton.textContent = this._submitButtonText;
  }
}

export default PopupWithForm;
