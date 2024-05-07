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
function resetCardForm() {
  cardTitleInput.value = "";
  cardUrlInput.value = "";
}

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

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListElement);
  e.target.reset();
  closeModal(addCardModal);
}

function handleAddCardModalClose() {
  closeModal(addCardModal);
  resetCardForm();
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageElement = cardElement.querySelector("#card__image");
  const cardTitleElement = cardElement.querySelector("#card__title");
  const likeButton = cardElement.querySelector("#card__like-button");
  const deleteButton = cardElement.querySelector("#card__delete-button");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageElement.addEventListener("click", () => {
    previewImageElement.src = data.link;
    previewImageTextElement.textContent = data.name;
    previewImageElement.alt = data.name;
    openModal(previewImageModal);
  });

  cardImageElement.src = data.link;
  cardImageElement.alt = data.name;
  cardTitleElement.textContent = data.name;

  return cardElement;
}

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
addCardModalCloseButton.addEventListener("click", handleAddCardModalClose);

initialCards.forEach((cardData) => renderCard(cardData, cardListElement));

//Modals close
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
