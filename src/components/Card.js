class Card {
  constructor(
    data,
    cardSelector,
    { handleCardClick, handleDeleteCard, handleLikeIcon },
    userId
  ) {
    this._title = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeIcon = handleLikeIcon;
    this._userId = userId;
    this._ownerId = data.owner._id;
  }

  /**
   * remove card
   */
  removeCard = () => {
    this._element.remove();
    this._element = null;
  };

  /**
   * toggle like button
   */
  toggleLike(amountLikes) {
    this._likeButton.classList.toggle("card__button-like_liked");
    this._element.querySelector(".card__likes-count").textContent =
      amountLikes.length;
  }

  // check it's like or not
  isLiked() {
    return this._likes.some((person) => person._id === this._userId);
  }

  // set amount of likes and render it
  setLikes(likes) {
    this._likes = likes;
    this._renderLikes();
  }

  // fill like image
  _addLike() {
    this._likeButton.classList.add("card__button-like_liked");
  }

  // change on like image
  _removeLike() {
    this._likeButton.classList.remove("card__button-like_liked");
  }

  // render information about like
  _renderLikes() {
    this._likesCount.textContent = this._likes.length;
    if (this.isLiked()) {
      this._addLike();
    } else {
      this._removeLike();
    }
  }

  /**
   * set all listeners on the card
   */
  _setEventListeners = () => {
    this._imageElement.addEventListener("click", () =>
      this._handleCardClick(this._element)
    );
    this._likeButton.addEventListener("click", () => {
      this._handleLikeIcon(this._id);
    });
    this._trashButton.addEventListener("click", () => {
      this._handleDeleteCard(this._id);
    });
  };

  /**
   * new element with card by template
   * @returns object
   */
  generateCard() {
    this._element = this._cardSelector.querySelector(".card").cloneNode(true);
    this._likeButton = this._element.querySelector(".card__button-like");
    this._imageElement = this._element.querySelector(".card__image");
    this._trashButton = this._element.querySelector(".card__button-trash");
    this._likesCount = this._element.querySelector(".card__likes-count");
    this._cardTitle = this._element.querySelector(".card__title");

    this._imageElement.src = this._link;
    this._imageElement.alt = this._title;
    this._cardTitle.textContent = this._title;
    this._likesCount.textContent = this._likes.length;
    this._setEventListeners();

    if (this._ownerId !== this._userId) {
      this._trashButton.style.display = "none";
    }

    this._renderLikes();
    if (this.isLiked()) {
      this._addLike();
    }

    return this._element;
  }
}

export default Card;
