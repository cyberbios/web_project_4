import "./index.css"; // add import of the main stylesheets file
import Api from "../components/Api";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForms.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";
import UserInfo from "../components/UserInfo.js";
import {
  configClasses,
  editFormElement,
  addCardFormElement,
  editAvatarElement,
  editProfileModalButton,
  addCardModalButton,
  editAvatarButton,
  nameEditProfileInput,
  jobEditProfileInput,
  cardTemplate,
} from "../utils/constants";

let cards;
let userId;

const fillEditProfileForm = (name, about) => {
  nameEditProfileInput.value = name;
  jobEditProfileInput.value = about;
};

//------------------------API----------------------------------
const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/cohort-3-en",
  headers: {
    authorization: "f3a40ce9-1f69-4ecd-ac6f-bd6bc99d92d1",
    "Content-Type": "application/json",
  },
});

/**
 * Fill data in editProfileMockup
 * @param {string} name
 * @param {string} job
 * @param {string} avatar
 */
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__subtitle",
  avatarSelector: ".profile__avatar-img",
});
/**
 * Generate new card
 * @param {Object} cardObject
 * @returns Object
 */
const createCard = (cardObject, userId) => {
  const card = new Card(
    cardObject,
    cardTemplate,
    {
      handleCardClick: () => {
        imageModal.open(cardObject.name, cardObject.link);
      },
      handleDeleteCard: (id) => {
        confirmModal.open();
        confirmModal.setAction(() => {
          confirmModal.showLoading();
          api
            .deleteCard(id)
            .then(() => {
              card.removeCard();
              confirmModal.close();
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => {
              confirmModal.hideLoading();
            });
        });
      },
      handleLikeIcon: (id) => {
        const isAlreadyLiked = card.isLiked();
        if (isAlreadyLiked) {
          api
            .dislikeCard(id)
            .then((res) => {
              card.setLikes(res.likes);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          api
            .likeCard(id)
            .then((res) => {
              card.setLikes(res.likes);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      },
    },
    userId
  );
  return card.generateCard();
};

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([items, userData]) => {
    userId = userData._id;
    userInfo.setUserInfo({ name: userData.name, about: userData.about });
    userInfo.setAvatar({ avatar: userData.avatar });
    cards = new Section(
      {
        items: items,
        renderer: (data) => {
          const cardElement = createCard(data, userId);
          return cardElement;
        },
      },
      ".gallery"
    );
    cards.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

const addNewCardModal = new PopupWithForm(
  "popup_type_add-card",
  "Save",
  (data) => {
    addNewCardModal.showLoading();
    return api
      .addCard(data)
      .then((res) => {
        const cardElement = createCard(res, userId);
        cards.prepenedItem(cardElement);
        addCardFormValidation.toggleButtonState();
        addNewCardModal.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        addNewCardModal.hideLoading();
      });
  }
);
addNewCardModal.setEventListeners();

const editAvatarModal = new PopupWithForm(
  "popup_type_edit-avatar",
  "Save",
  (data) => {
    editAvatarModal.showLoading();
    return api
      .editUserAvatar(data.link)
      .then(() => {
        userInfo.setAvatar({ avatar: data.link });
        editAvatarModal.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        editAvatarModal.hideLoading();
      });
  }
);
editAvatarModal.setEventListeners();

const editModal = new PopupWithForm(
  "popup_type_edit-profile",
  "Save",
  (data) => {
    editModal.showLoading();
    api
      .editUserInfo(data)
      .then((res) => {
        userInfo.setUserInfo(res);
        editModal.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        editModal.hideLoading();
      });
  }
);
editModal.setEventListeners();

const imageModal = new PopupWithImage("popup_type_card");
imageModal.setEventListeners();
const confirmModal = new PopupWithSubmit("popup_type_delete-card-form");
confirmModal.setEventListeners();

editProfileModalButton.addEventListener("click", () => {
  const data = userInfo.getUserInfo();
  fillEditProfileForm(data.name, data.about);
  editModal.open();
  editProfileFormValidator.resetValidation();
});

addCardModalButton.addEventListener("click", () => {
  addNewCardModal.open();
  addCardFormValidation.resetValidation();
  addCardFormValidation.toggleButtonState();
});
editAvatarButton.addEventListener("click", () => {
  editAvatarModal.open();
  editAvatarCardFormValidation.resetValidation();
  editAvatarCardFormValidation.toggleButtonState();
});

//--------------------------Validation-------------------------------------
const editProfileFormValidator = new FormValidator(
  configClasses,
  editFormElement
);
editProfileFormValidator.enableValidation();

const addCardFormValidation = new FormValidator(
  configClasses,
  addCardFormElement
);
addCardFormValidation.enableValidation();

const editAvatarCardFormValidation = new FormValidator(
  configClasses,
  editAvatarElement
);
editAvatarCardFormValidation.enableValidation();
