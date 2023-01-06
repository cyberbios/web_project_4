const configClasses = {
  inputSelector: ".form__input",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
};
//Wrappers
const editProfileModal = document.querySelector(".popup_type_edit-profile");
const editFormElement = editProfileModal.querySelector(".form");

const addCardModal = document.querySelector(".popup_type_add-card");
const addCardFormElement = addCardModal.querySelector(".form");

const editAvatarCardModal = document.querySelector(".popup_type_edit-avatar");
const editAvatarElement = editAvatarCardModal.querySelector(".form");

//Buttons
const editProfileModalButton = document.querySelector(".profile__button-edit");
const addCardModalButton = document.querySelector(".profile__button-add");
const editAvatarButton = document.querySelector(
  ".profile__change-avatar-button"
);

//Inputs
const nameEditProfileInput = document.querySelector(
  ".form__input_content_name"
);
const jobEditProfileInput = document.querySelector(".form__input_content_job");

const cardTemplate = document.querySelector("#card").content;

export {
  configClasses,
  editProfileModal,
  editFormElement,
  addCardModal,
  addCardFormElement,
  editAvatarCardModal,
  editAvatarElement,
  editProfileModalButton,
  addCardModalButton,
  editAvatarButton,
  nameEditProfileInput,
  jobEditProfileInput,
  cardTemplate,
};
