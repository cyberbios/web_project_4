/**
 * Open popup
 * @param {string} modal
 */
const openPopup = (modal) => {
  modal.classList.add("popup_opened");

  document.addEventListener("keydown", closePopupByEscape);
  modal.addEventListener("mousedown", closePopupOnRemoteClick);
};

/**
 * Hide popup
 * @param {string} modal
 */
const hidePopup = (modal) => {
  modal.classList.remove("popup_opened");
  modal.removeEventListener("keydown", closePopupByEscape);
  modal.removeEventListener("mousedown", closePopupOnRemoteClick);
};

/**
 * Close popup by 'esc' key
 * @param {event} evt
 */
const closePopupByEscape = (evt) => {
  if (evt.key === "Escape") {
    hidePopup(document.querySelector(".popup_opened"));
  }
};

/**
 * Close popup by click mouse out off popup
 * @param {event} evt
 */
const closePopupOnRemoteClick = (evt) => {
  if (evt.target === evt.currentTarget) {
    hidePopup(evt.target);
  }
};

export { openPopup, hidePopup };
