import Popup from "./Popup";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.popUpDescription = this._popupElement.querySelector(
      ".popup__description"
    );
    this._image = this._popupElement.querySelector(".popup__image");
  }
  open(name, link) {
    this.popUpDescription.textContent = name;
    this._image.src = link;
    this._image.alt = name;
    super.open();
  }
}

export default PopupWithImage;
