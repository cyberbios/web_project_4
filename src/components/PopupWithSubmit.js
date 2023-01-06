import Popup from "./Popup.js";

class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".form");
    this._submitButton = this._popupForm.querySelector(".form__button");
  }

  showLoading() {
    this._submitButton.textContent = "Removing...";
  }

  hideLoading() {
    this._submitButton.textContent = "Yes";
  }
  setAction(action) {
    this._submitHandler = action;
  }
  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener("submit", (e) => {
      e.preventDefault();
      this._submitHandler();
    });
    super.setEventListeners();
  }
}

export default PopupWithSubmit;
