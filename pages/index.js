const editProfileModal = document.querySelector(".popup_type_edit-profile");
const editFormElement = editProfileModal.querySelector(".form");

const addCardModal = document.querySelector(".popup_type_add-card");
const addCardFormElement = addCardModal.querySelector(".form");

const cardViewModal = document.querySelector(".popup_type_card");

const cardViewImgage = cardViewModal.querySelector(".popup__image");
const cardViewDescription = cardViewModal.querySelector(".popup__description");

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

//Open popup
function openPopup(modal) {
  modal.classList.add("popup_opened");
}
//Close popup
function closePopup(modal) {
  modal.classList.remove("popup_opened");
}

//Fill data in CardViewPopup
function fillCardViewPopup(card) {
  const image = card.querySelector(".card__image");

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

  //Open popup image in full size when click on it
  imageElement.addEventListener("click", (e) => {
    fillCardViewPopup(card);
  });

  return cardElement;
}

function fillCardViewPopup(card) {
  cardViewImgage.src = card.link;
  cardViewImgage.alt = card.name;
  cardViewDescription.textContent = card.name;
  openPopup(cardViewModal);
}

//Submit information profile title and subtitle
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameEditProfileInput.value;
  profileJob.textContent = jobEditProfileInput.value;

  closePopup(editProfileModal);
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

  closePopup(addCardModal);
  addCardFormElement.reset();
}

editProfileModalButton.addEventListener("click", () => {
  fillEditProfileForm(profileName.textContent, profileJob.textContent);
  openPopup(editProfileModal);
});
editProfileModalCloseButton.addEventListener("click", () => {
  closePopup(editProfileModal);
});

addCardModalButton.addEventListener("click", () => openPopup(addCardModal));
addcardModalCloseButton.addEventListener("click", () => {
  closePopup(addCardModal);
});

cardViewModalCloseButton.addEventListener("click", () => {
  closePopup(cardViewModal);
});

//Add all cards from array by templates
initialCards.forEach((card) => {
  const cardElement = initCard(card);
  gallery.append(cardElement);
});

editFormElement.addEventListener("submit", handleProfileFormSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);
