import Card from "../components/Card.js";

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

const cardData = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

const card = new Card(cardData, "#card__template");
card.getView();

// Template
const cardTemplate =
  document.querySelector("#card__template").content.firstElementChild;

// Modals
const cardListElement = document.querySelector("#card__list");
const profileEditModal = document.querySelector("#profile__edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const previewImageModal = document.querySelector("#image-modal");
const modals = document.querySelectorAll(".modal");

// Forms
const profileFormElement = document.forms["profile-form"];
const addCardFormElement = document.forms["card-form"];

//Form inputs
const profileTitleInput = profileFormElement.querySelector(
  "#profile__title-input"
);
const profileDescriptionInput = profileFormElement.querySelector(
  "#profile__description-input"
);
const cardTitleInput = addCardFormElement.querySelector("#card__title-input");
const cardUrlInput = addCardFormElement.querySelector("#card__url-input");

// Buttons
const profileEditButton = document.querySelector("#profile__edit-button");
const addNewCardButton = document.querySelector("#profile__add-card-button");

// Close Buttons
const profileModalCloseButton = profileEditModal.querySelector(
  "#modal__close-button"
);
const addCardModalCloseButton = addCardModal.querySelector(
  "#modal__close-button"
);
const imageModalCloseButton = previewImageModal.querySelector(
  "#modal__close-button"
);

// Profile
const profileTitle = document.querySelector("#profile__title");
const profileDescription = document.querySelector(".profile__description");

// Image Modal
const previewImageElement = previewImageModal.querySelector(".modal__image");
const previewImageTextElement =
  previewImageModal.querySelector(".modal__caption");

// Functions
function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleKeyDown);
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleKeyDown);
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
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

function handleLikeIcon(e) {
  e.target.classList.toggle("card__like-button_active");
}

function handleDeleteCard(e) {
  e.target.closest(".card__list-item").remove();
}

function handleImageClick(data) {
  previewImageElement.src = data.link;
  previewImageElement.alt = data.name;
  previewImageTextElement.textContent = data.name;
  openModal(previewImageModal);
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageElement = cardElement.querySelector("#card__image");
  const cardTitleElement = cardElement.querySelector("#card__title");
  const likeButton = cardElement.querySelector("#card__like-button");
  const deleteButton = cardElement.querySelector("#card__delete-button");

  likeButton.addEventListener("click", handleLikeIcon);
  deleteButton.addEventListener("click", handleDeleteCard);
  cardImageElement.addEventListener("click", () => handleImageClick(data));

  cardImageElement.src = data.link;
  cardImageElement.alt = data.name;
  cardTitleElement.textContent = data.name;

  return cardElement;
}

// Fill Profile Form
function fillProfileForm() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
}

// Form Listner
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);
profileFormElement.addEventListener("submit", handleProfileFormSubmit);

// Modal Close Listner
profileEditButton.addEventListener("click", fillProfileForm);
addNewCardButton.addEventListener("click", () => openModal(addCardModal));

// Close Buttons
initialCards.forEach((cardData) => renderCard(cardData, cardListElement));

const handleKeyDown = (e) => {
  if (e.key === "Escape") {
    const modals = document.querySelectorAll(".modal_opened");
    modals.forEach(closeModal);
  }
};

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
