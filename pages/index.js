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

// ! ||--------------------------------------------------------------------------------||
// ! ||                                   Elements                                     ||
// ! ||--------------------------------------------------------------------------------||

// Template
const cardTemplate =
  document.querySelector("#card__template").content.firstElementChild;
const modals = document.querySelectorAll(".modal");
const cardListElement = document.querySelector("#card__list");

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

//Image
const previewImageModal = document.querySelector("#image-modal");
const previewImageElement = previewImageModal.querySelector(".modal__image");
const previewImageTextElement =
  previewImageModal.querySelector(".modal__caption");

// * ||--------------------------------------------------------------------------------||
// * ||                                   Functions                                    ||
// * ||--------------------------------------------------------------------------------||

function renderCard(data, cardListElement) {
  const card = new Card(initialCards[0], cardTemplate, handleImageClick);
  cardListElement.prepend(card.getCardElement());
}

function handleImageClick(data) {
  previewImageElement.src = data.link;
  previewImageElement.alt = data.name;
  previewImageTextElement.textContent = data.name;
  openModal(previewImageModal);
}

initialCards.forEach((data) => renderCard(data, cardListElement));

const profileEditValidator = new FormValidator(config, profileFormElement);
const addCardValidator = new FormValidator(config, addCardFormElement);

profileEditValidator.enableValidation();
addCardValidator.enableValidation();

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
  renderCard({ name, link }, cardListElement);
  e.target.reset();
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

// Modal Close Listener
profileEditButton.addEventListener("click", fillProfileForm);
addNewCardButton.addEventListener("click", () => openModal(addCardModal));

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

// * ||--------------------------------------------------------------------------------||
// * ||                                 Comment                                        ||
// * ||--------------------------------------------------------------------------------||

// function getCardElement() {
//   const card = new Card(data, cardTemplate, handleImageClick);
//   const cardElement = card.getView();
//   return cardElement;
// }

// const card = new Card(initialCards[0], cardTemplate, handleImageClick);

// function handleLikeIcon(e) {
//   e.target.classList.toggle("card__like-button_active");
// }

// function handleDeleteCard(e) {
//   e.target.closest(".card__list-item").remove();
// }

// function getCardElement(data) {
//   const cardElement = cardTemplate.cloneNode(true);
//   const cardImageElement = cardElement.querySelector("#card__image");
//   const cardTitleElement = cardElement.querySelector("#card__title");
//   const likeButton = cardElement.querySelector("#card__like-button");
//   const deleteButton = cardElement.querySelector("#card__delete-button");

//   likeButton.addEventListener("click", handleLikeIcon);
//   deleteButton.addEventListener("click", handleDeleteCard);
//   cardImageElement.addEventListener("click", () => handleImageClick(data));

//   cardImageElement.src = data.link;
//   cardImageElement.alt = data.name;
//   cardTitleElement.textContent = data.name;

//   return cardElement;
// }
