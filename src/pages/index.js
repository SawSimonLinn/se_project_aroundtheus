import "../pages/index.css";

import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithConfirmation from "../components/PopupWithComfirmation.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import ProfileEditImage from "../components/ProfileEditImage.js";

import {
  formList,
  profileEditButton,
  profileEditIcon,
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
  headers: {
    authorization: "1abbe3bb-ec4a-49b1-8cc7-97fb0e8300a6",
    "Content-Type": "application/json",
  },
});

// modal instances

// Create an instance of the Profile class
const profile = new ProfileEditImage(
  ".profile__container",
  ".profile__edit-icon"
);
profile.setEventListeners();

const deleteModal = new PopupWithConfirmation(
  "#delete__modal",
  handleDeleteCardFormSubmit
);
deleteModal.setEventListeners();

const profileImageModal = new PopupWithForm(
  "#profile-image-modal",
  handleProfileImageFormSubmit
);
profileImageModal.setEventListeners();

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

// ? ||--------------------------------------------------------------------------------||
// ? ||----------------------------------- API ----------------------------------------||
// ? ||--------------------------------------------------------------------------------||
api
  .getUserInfo()
  .then((userData) => {
    userInfo.setUserInfo({
      name: userData.name,
      about: userData.about,
    });
    userInfo.setUserAvatar({ avatar: userData.avatar });
  })
  .catch((err) => {
    console.error(err);
  });

// cardSection is an instance of the Section class
let cardSection;
api
  .getInitialCards()
  .then((cardData) => {
    cardSection = new Section(
      {
        items: cardData,
        renderer: renderCard,
      },
      "#card__list"
    );

    cardSection.renderItems();
  })
  .catch((err) => {
    console.error(err);
  });

// ! ||--------------------------------------------------------------------------------||
// ! ||-------------------------------Function-----------------------------------------||
// ! ||--------------------------------------------------------------------------------||

function handleDeleteClick() {
  deleteModal.open();
}

function handleCardImageClick(cardData) {
  previewImageModal.open(cardData);
}

function handleLikeClick(card) {
  api
    .toggleCardLike(card.id, card.isLiked)
    .then((res) => {
      card.setIsLiked(res);
    })
    .catch((err) => {
      console.error(err);
    });
}

// function to create a card
function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card__template",
    handleCardImageClick,
    handleDeleteClick,
    handleLikeClick
  );
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
  formValidators["profile-form"].resetValidation();
  proileEditModal.open();
});

addCardButton.addEventListener("click", () => {
  addCardModal.open();
});

profileEditIcon.addEventListener("click", () => {
  profileImageModal.open();
});
// * ||--------------------------------------------------------------------------------||
// * ||-------------------------------Event Handler------------------------------------||
// * ||--------------------------------------------------------------------------------||

function handleProfileImageFormSubmit(inputValues) {
  profileImageModal.setSubmitButtonText("Saving....");
  api
    .editProfileImage(inputValues)
    .then((res) => {
      userInfo.setUserAvatar(res);
      profileImageModal.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      profileImageModal.setSubmitButtonText("Save");
    });
}

// profile form submit handlers
function handleProfileFormSubmit(inputValues) {
  proileEditModal.setSubmitButtonText("Saving....");

  api
    .editProfile({
      name: inputValues.name,
      about: inputValues.about,
    })
    .then(({ name, about }) => {
      userInfo.setUserInfo({ name, about });
      proileEditModal.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      proileEditModal.setSubmitButtonText("Save");
    });
}

function handleAddCardFormSubmit(inputValues) {
  addCardModal.setSubmitButtonText("Saving....");

  api
    .addCard({
      name: inputValues.name,
      link: inputValues.link,
    })
    .then(({ name, link }) => {
      cardSection.addItem(createCard({ name, link }));
      addCardModal.close();
      formValidators["card-form"].disableButton();
      addCardModal.reset();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      addCardModal.setSubmitButtonText("Save");
    });
}

function handleDeleteCardFormSubmit(card) {
  deleteModal.setSubmitAction(() => {
    deleteModal.setSubmitButtonText("Deleting....");

    api
      .removeCard(card.id)
      .then(() => {
        card.handleDeleteCard();
        deleteModal.close();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        deleteModal.setSubmitButtonText("Delete");
      });
  });
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
