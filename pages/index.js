//Wrappers
const editProfileModal = document.querySelector(".popup_type_edit-profile");
const editFormElement = editProfileModal.querySelector(".form");

const addCardModal = document.querySelector(".popup_type_add-card");
const addCardFormElement = addCardModal.querySelector(".form");

const cardViewModal = document.querySelector(".popup_type_card");

const gallery = document.querySelector(".gallery");

//Buttons
const editProfileModalButton = document.querySelector(".profile__button-edit");
const editProfileModalCloseButton =
  editProfileModal.querySelector(".popup__close");

const cardViewModalCloseButton = cardViewModal.querySelector(".popup__close");

const addCardModalButton = document.querySelector(".profile__button-add");
const addCardModalCloseButton = addCardModal.querySelector(".popup__close");

//Inputs
const nameEditProfileInput = document.querySelector(
  ".form__input_content_name"
);

const jobEditProfileInput = document.querySelector(".form__input_content_job");

const titleAddCardInput = document.querySelector(".form__input_content_title");
const linkAddCardInput = document.querySelector(".form__input_content_link");

//Form data
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__subtitle");

const cardTemplate = document.querySelector("#card").content;

const initialCards = [
  {
    name: "Cousteau’s underwater classroom: Imparting lessons from under the sea.",
    link: "https://ogden_images.s3.amazonaws.com/www.mauinews.com/images/2020/02/12060413/CEV3927-1-cousteau.jpg",
  },
  {
    name: "Jacques Cousteau Wearing Diving Gear by Bettmann",
    link: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/jacques-cousteau-wearing-diving-gear-bettmann.jpg",
  },
  {
    name: "Watercraft of Explorer, Invented by Jacques Cousteau",
    link: "http://35410006.weebly.com/uploads/7/1/8/3/71834201/5553598_orig.jpg",
  },
  {
    name: "Jacques Cousteau, Calypso boat and the Watercrafts, Diving around the World",
    link: "https://i.pinimg.com/originals/7d/b4/de/7db4de0c201fc36c8da989de15717bd5.jpg",
  },
  {
    name: "Jacques Cousteau, underwater man",
    link: "https://plus.unsplash.com/premium_photo-1661265851801-e523847e3932?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
  },
  {
    name: "Calypso Vessel - in Montreal - Canada. Jacques Cousteau around the world",
    link: "https://upload.wikimedia.org/wikipedia/commons/6/6a/%22Calypso%22_-_Montreal%2C_1980.jpg",
  },
];

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
  document.removeEventListener("keydown", closePopupByEscape);
  modal.removeEventListener("mousedown", closePopupOnRemoteClick);
};

/**
 * Fill data in CardViewPopup
 * @param {string} card
 */
const openPreviewPopup = (card) => {
  const image = card.querySelector(".card__image");
  const cardViewImgage = cardViewModal.querySelector(".popup__image");
  const cardViewDescription = cardViewModal.querySelector(
    ".popup__description"
  );

  cardViewImgage.src = image.src;
  cardViewImgage.alt = image.alt;
  cardViewDescription.textContent = image.alt;
  openPopup(cardViewModal);
};

/**
 * Fill data in editProfileMockup
 * @param {string} name
 * @param {string} job
 */
const fillEditProfileForm = (name, job) => {
  nameEditProfileInput.value = name;
  jobEditProfileInput.value = job;
};

/**
 * Initial card
 * @param {string} card
 * @returns
 */
const initCard = (card) => {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const imageElement = cardElement.querySelector(".card__image");
  const titleElement = cardElement.querySelector(".card__title");
  const trashButton = cardElement.querySelector(".card__button-trash");
  const likeButton = cardElement.querySelector(".card__button-like");
  imageElement.src = card.link;
  imageElement.alt = card.name;
  titleElement.textContent = card.name;

  likeButton.addEventListener("click", (e) => {
    e.target.classList.toggle("card__button-like_liked");
  });
  trashButton.addEventListener("click", (e) => {
    const listItem = trashButton.closest(".card");
    listItem.remove();
  });

  cardElement.querySelector(".card__image").addEventListener("click", (e) => {
    openPreviewPopup(cardElement);
  });

  return cardElement;
};

/**
 * Submit information profile title and subtitle
 * @param {event} evt
 */
const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();

  profileName.textContent = nameEditProfileInput.value;
  profileJob.textContent = jobEditProfileInput.value;

  hidePopup(editProfileModal);
};

/**
 * Submit information about new card
 * @param {event} evt
 */
const handleAddCardFormSubmit = (evt) => {
  evt.preventDefault();
  const cardInput = {
    name: titleAddCardInput.value,
    link: linkAddCardInput.value,
  };
  const cardElement = initCard(cardInput);

  gallery.prepend(cardElement);

  hidePopup(addCardModal);
  addCardFormElement.reset();
  const sumbitButton = addCardModal.querySelector(".form__button");
  toggleButtonState(
    [titleAddCardInput, linkAddCardInput],
    sumbitButton,
    configClasses
  );
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

editProfileModalButton.addEventListener("click", () => {
  fillEditProfileForm(profileName.textContent, profileJob.textContent);
  checkAllInputsError(editFormElement);
  openPopup(editProfileModal);
});
editProfileModalCloseButton.addEventListener("click", () => {
  hidePopup(editProfileModal);
});

addCardModalButton.addEventListener("click", () => {
  openPopup(addCardModal);
});
addCardModalCloseButton.addEventListener("click", () => {
  hidePopup(addCardModal);
});

cardViewModalCloseButton.addEventListener("click", () =>
  hidePopup(cardViewModal)
);

//Add all cards from array by templates
initialCards.forEach((card) => {
  const cardElement = initCard(card);
  gallery.append(cardElement);
});

editFormElement.addEventListener("submit", handleProfileFormSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);
