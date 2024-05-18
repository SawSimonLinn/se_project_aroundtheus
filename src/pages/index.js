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
  profileTitleInput,
  profileDescriptionInput,
  addNewCardButton,
  nameInput,
  aboutInput,
  config,
} from "../utils/constants.js";

// ? ||--------------------------------------------------------------------------------||

const cardSection = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  "#card__list"
);

cardSection.renderItems();

// ? ||--------------------------------------------------------------------------------||

const proileModal = new PopupWithForm(
  "#profile__edit-modal",
  handleProfileFormSubmit
);
proileModal.setEventListeners();

const cardModal = new PopupWithForm("#add-card-modal", handleAddCardFormSubmit);
cardModal.setEventListeners();

const imageModal = new PopupWithImage("#preview__image-modal");
imageModal.setEventListeners();

// ? ||--------------------------------------------------------------------------------||

const userInfo = new UserInfo({
  nameElement: "#profile__title",
  aboutElement: ".profile__description",
});

// ? ||--------------------------------------------------------------------------------||

function createCard(cardData) {
  const card = new Card(cardData, "#card__template", () => {
    imageModal.open(cardData);
  });
  return card.getCardElement();
}

function renderCard(item) {
  const cardElement = createCard(item);
  cardSection.addItem(cardElement);
}

// ? ||--------------------------------------------------------------------------------||

profileEditButton.addEventListener("click", () => {
  const currentUser = userInfo.getUserInfo();
  nameInput.value = currentUser.name.trim();
  aboutInput.value = currentUser.about.trim();
  proileModal.open();
});

addNewCardButton.addEventListener("click", () => {
  cardModal.open();
});

// ? ||--------------------------------------------------------------------------------||

function handleProfileFormSubmit(inputValues) {
  userInfo.setUserInfo({
    name: inputValues.name,
    about: inputValues.about,
  });

  proileModal.close();
}

function handleAddCardFormSubmit(inputValues) {
  const name = inputValues.value;
  const link = inputValues.value;
  const cardData = { name, link };
  cardSection.addItem(createCard(cardData));
  formValidators["card-form"].disableButton();
  cardModal.close();
}

// ? ||--------------------------------------------------------------------------------||

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
