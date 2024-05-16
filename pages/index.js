import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
  modalSpan: ".modal__span",
};

// Initial Cards
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// * ||--------------------------------------------------------------------------------||
// * ||                                   Elements                                     ||
// * ||--------------------------------------------------------------------------------||

// Modals
const modals = document.querySelectorAll(".modal");

//Profile
const profileEditModal = document.querySelector("#profile__edit-modal");
const profileFormElement = document.forms["profile-form"];
const profileTitleInput = profileFormElement.querySelector(
  "#profile__title-input"
);
const profileDescriptionInput = profileFormElement.querySelector(
  "#profile__description-input"
);
const profileEditButton = document.querySelector("#profile__edit-button");
const profileTitle = document.querySelector("#profile__title");
const profileDescription = document.querySelector(".profile__description");

//Add Card
const addCardModal = document.querySelector("#add-card-modal");
const addCardFormElement = document.forms["card-form"];
const cardTitleInput = addCardFormElement.querySelector("#card__title-input");
const cardUrlInput = addCardFormElement.querySelector("#card__url-input");
const addNewCardButton = document.querySelector("#profile__add-card-button");

const cardSection = document.querySelector(".card");
const cardListElement = cardSection.querySelector("#card__list");

//Image
const previewImageModal = document.querySelector("#image-modal");
const previewImageElement = previewImageModal.querySelector(".modal__image");
const previewImageTextElement =
  previewImageModal.querySelector(".modal__caption");

// * ||--------------------------------------------------------------------------------||
// * ||                                   Functions                                    ||
// * ||--------------------------------------------------------------------------------||

// Create Card
function createCard(cardData) {
  const card = new Card(cardData, "#card__template", handleImageClick);
  return card.getCardElement();
}

// Render Card
function renderCard(cardData, cardListElement, method = "prepend") {
  const cardElement = createCard(cardData);
  cardListElement[method](cardElement);
}

function handleImageClick(cardData) {
  previewImageElement.src = cardData.link;
  previewImageElement.alt = cardData.name;
  previewImageTextElement.textContent = cardData.name;
  openModal(previewImageModal);
}

initialCards.forEach((cardData) => renderCard(cardData, cardListElement));

const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(config);

// Reset Validation
formValidators[profileFormElement.getAttribute("name")].resetValidation();
formValidators[addCardFormElement.getAttribute("name")].resetValidation();

// ? ||--------------------------------------------------------------------------------||
// ? ||                                 Event Handlers                                 ||
// ? ||--------------------------------------------------------------------------------||

// Fill Profile Form
function fillProfileForm() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
}

// Profile Form
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

// Add Card Form
function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  const submitButton = e.target.querySelector(".modal__button");

  renderCard({ name, link }, cardListElement);
  e.target.reset();
  submitButton.classList.add("modal__button_disabled");
  submitButton.disabled = true;
  closeModal(addCardModal);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleKeyDown);
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleKeyDown);
}

const handleKeyDown = (e) => {
  if (e.key === "Escape") {
    const modals = document.querySelectorAll(".modal_opened");
    modals.forEach(closeModal);
  }
};

// ? ||--------------------------------------------------------------------------------||
// ? ||                                 Form Listener                                  ||
// ? ||--------------------------------------------------------------------------------||

// Form Listener
profileFormElement.addEventListener("submit", handleProfileFormSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

// Modal Listeners
profileEditButton.addEventListener("click", fillProfileForm);
addNewCardButton.addEventListener("click", () => openModal(addCardModal));

// Modal Close Listeners
modals.forEach((modal) => {
  modal.addEventListener("mousedown", (e) => {
    if (e.target.classList.contains("modal_opened")) {
      closeModal(modal);
    }
    if (e.target.classList.contains("modal__close-button")) {
      closeModal(modal);
    }
  });
});
