class Card {
  constructor(title, link, cardSelector, handleImageClick) {
    this._title = title;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  /**
   * remove card
   */
  _handleDelete = () => {
    this._element.remove();
    this._element = null;
  };

  /**
   * toggle like button
   */
  _handleLike = () => {
    this._likeButton.classList.toggle("card__button-like_liked");
  };

  /**
   * set all listeners on the card
   */
  _setEventListeners = () => {
    this._imageElement.addEventListener("click", () =>
      this._handleImageClick(this._element)
    );
    this._likeButton.addEventListener("click", this._handleLike);
    this._trashButton.addEventListener("click", this._handleDelete);
  };

  /**
   * new element with card by template
   * @returns object
   */
  generateCard = () => {
    this._element = this._cardSelector.querySelector(".card").cloneNode(true);
    this._likeButton = this._element.querySelector(".card__button-like");
    this._imageElement = this._element.querySelector(".card__image");
    this._trashButton = this._element.querySelector(".card__button-trash");
    this._imageElement.src = this._link;
    this._imageElement.alt = this._title;
    this._element.querySelector(".card__title").textContent = this._title;

    this._setEventListeners();

    return this._element;
  };
}

export default Card;
