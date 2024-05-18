import "../pages/index.css";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

import {
  initialCards,
  formList,
  profileEditButton,
  addCardButton,
  nameInput,
  aboutInput,
  config,
} from "../utils/constants.js";

// ? ||--------------------------------------------------------------------------------||
// ? ||---------------------------------- Instances -----------------------------------||
// ? ||--------------------------------------------------------------------------------||

// cardSection is an instance of the Section class
const cardSection = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  "#card__list"
);

cardSection.renderItems();

// modal instances
const proileEditModal = new PopupWithForm(
  "#profile__edit-modal",
  handleProfileFormSubmit
);
proileEditModal.setEventListeners();

const addCardModal = new PopupWithForm(
  "#add-card-modal",
  handleAddCardFormSubmit
);
addCardModal.setEventListeners();

const previewImageModal = new PopupWithImage("#preview__image-modal");
previewImageModal.setEventListeners();

// userInfo instance
const userInfo = new UserInfo({
  nameElement: "#profile__title",
  aboutElement: ".profile__description",
});

// * ||--------------------------------------------------------------------------------||
// * ||----------------------------------Function--------------------------------------||
// * ||--------------------------------------------------------------------------------||

// function to create a card
function createCard(cardData) {
  const card = new Card(cardData, "#card__template", () => {
    previewImageModal.open(cardData);
  });
  return card.getCardElement();
}

function renderCard(item) {
  const cardElement = createCard(item);
  cardSection.addItem(cardElement);
}

// * ||--------------------------------------------------------------------------------||
// * ||-------------------------------Event Listeners----------------------------------||
// * ||--------------------------------------------------------------------------------||

// event listeners
profileEditButton.addEventListener("click", () => {
  const currentUser = userInfo.getUserInfo();
  nameInput.value = currentUser.name;
  aboutInput.value = currentUser.about;
  proileEditModal.open();
});

addCardButton.addEventListener("click", () => {
  addCardModal.open();
});

// * ||--------------------------------------------------------------------------------||
// * ||-------------------------------Event Handlers-----------------------------------||
// * ||--------------------------------------------------------------------------------||

// profile form submit handlers
function handleProfileFormSubmit(inputValues) {
  userInfo.setUserInfo({
    name: inputValues.name,
    about: inputValues.about,
  });

  proileEditModal.close();
}

// card form submit handlers
function handleAddCardFormSubmit(inputValues) {
  const name = inputValues.value;
  const link = inputValues.value;
  const cardData = { name, link };
  cardSection.addItem(createCard(cardData));
  formValidators["card-form"].disableButton();
  addCardModal.close();
}

// ? ||--------------------------------------------------------------------------------||
// ? ||-------------------------------Form Validation----------------------------------||
// ? ||--------------------------------------------------------------------------------||

// form validation
const formValidators = {};
const enableValidation = (formList) => {
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    validator.enableValidation();
    validator[formElement.getAttribute("name")] = validator;
    return validator;
  });
};

enableValidation(formList);
