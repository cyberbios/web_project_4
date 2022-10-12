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
const addcardModalCloseButton = addCardModal.querySelector(".popup__close");

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
    link: "../images/cousteau_underwater.png",
  },
  {
    name: "Jacques Cousteau Wearing Diving Gear by Bettmann",
    link: "../images/jacques-cousteau-wearing-diving-gear-bettmann.png",
  },
  {
    name: "Watercraft of Explorer, Invented by Jacques Cousteau",
    link: "../images/watercraft.png",
  },
  {
    name: "Jacques Cousteau, Calypso boat and the Watercrafts, Diving around the World",
    link: "../images/calypso.png",
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

//Open popup
function openPopup(modal) {
  modal.classList.add("popup_opened");
}
//Hidden popup
function hiddenPopup(modal) {
  modal.classList.remove("popup_opened");
}

//Fill data in CardViewPopup
function fillCardViewPopup(card) {
  const image = card.querySelector(".card__image");
  const cardViewImgage = cardViewModal.querySelector(".popup__image");
  const cardViewDescription = cardViewModal.querySelector(
    ".popup__description"
  );

  cardViewImgage.src = image.src;
  cardViewImgage.alt = image.alt;
  cardViewDescription.textContent = image.alt;
  openPopup(cardViewModal);
}
//Fill data in editProfileMockup
function fillEditProfileForm(name, job) {
  nameEditProfileInput.value = name;
  jobEditProfileInput.value = job;
}

//Initial card
function initCard(card) {
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
    fillCardViewPopup(cardElement);
  });

  return cardElement;
}
//Submit information profile title and subtitle
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameEditProfileInput.value;
  profileJob.textContent = jobEditProfileInput.value;

  hiddenPopup(editProfileModal);
}
//Submit information about new card
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const cardInput = {
    name: titleAddCardInput.value,
    link: linkAddCardInput.value,
  };
  const cardElement = initCard(cardInput);

  gallery.prepend(cardElement);

  hiddenPopup(addCardModal);
  addCardFormElement.reset();
}

editProfileModalButton.addEventListener("click", () => {
  fillEditProfileForm(profileName.textContent, profileJob.textContent);
  openPopup(editProfileModal);
});
editProfileModalCloseButton.addEventListener("click", () => {
  hiddenPopup(editProfileModal);
});

addCardModalButton.addEventListener("click", () => openPopup(addCardModal));
addcardModalCloseButton.addEventListener("click", () => {
  hiddenPopup(addCardModal);
});

cardViewModalCloseButton.addEventListener("click", () => {
  hiddenPopup(cardViewModal);
});

//Add all cards from array by templates
initialCards.forEach((card) => {
  const cardElement = initCard(card);
  gallery.append(cardElement);
});

editFormElement.addEventListener("submit", handleProfileFormSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);
