import "../pages/index.css";

import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

import {
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

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  authToken: "1abbe3bb-ec4a-49b1-8cc7-97fb0e8300a6",
});

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

api.getUserInfo().then((userData) => {
  userInfo.setUserInfo({
    name: userData.name,
    about: userData.about,
  });
});

// cardSection is an instance of the Section class
api.getInitialCards().then((cardData) => {
  const cardSection = new Section(
    {
      items: cardData,
      renderer: renderCard,
    },
    "#card__list"
  );

  cardSection.renderItems();

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
});

// * ||--------------------------------------------------------------------------------||
// * ||----------------------------------Function--------------------------------------||
// * ||--------------------------------------------------------------------------------||

// function to create a card

// * ||--------------------------------------------------------------------------------||
// * ||-------------------------------Event Listeners----------------------------------||
// * ||--------------------------------------------------------------------------------||

// event listeners
profileEditButton.addEventListener("click", () => {
  const currentUser = userInfo.getUserInfo();
  nameInput.value = currentUser.name;
  aboutInput.value = currentUser.about;
  formValidators["profile-form"].resetValidation();
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
  const name = inputValues.name;
  const link = inputValues.link;
  const cardData = { name, link };
  cardSection.addItem(createCard(cardData));
  addCardModal.close();

  formValidators["card-form"].disableButton();
  addCardModal.reset();
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
    formValidators[formElement.getAttribute("name")] = validator;
  });
};

enableValidation(formList);
