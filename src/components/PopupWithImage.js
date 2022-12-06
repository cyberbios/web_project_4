import Popup from "./Popup";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.popUpDescription = this._popupElement.querySelector(
      ".popup__description"
    );
  }
  open(name, link) {
    this.popUpDescription.textContent = name;
    const image = this._popupElement.querySelector(".popup__image");
    image.src = link;
    image.alt = name;
    super.open();
  }
}

export default PopupWithImage;
