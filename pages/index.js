const profileEdit = document.querySelector(".profile__edit");
const profilePopup = document.querySelector(".popup_type_profile");

const profileFormElement = document.querySelector(".popup__form_type_profile");

const nameInput = document.querySelector(".popup__input_type_title");
const jobInput = document.querySelector(".popup__input_type_subtitle");

const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

profileEdit.addEventListener("click", function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;

  openPopup(profilePopup);
});

profilePopup.addEventListener("click", function (event) {
  if (event.target.classList.contains("popup__close")) {
    closePopup(profilePopup);
  }
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;

  closePopup(profilePopup);
}

// Connect the handler to the form:
// it will watch the submit event
profileFormElement.addEventListener("submit", handleProfileFormSubmit);
