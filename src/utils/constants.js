// Config
export const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
  modalSpan: ".modal__span",
};

// Initial Cards
export const initialCards = [
  {
    name: "San Francisco",
    link: "https://images.unsplash.com/photo-1471306224500-6d0d218be372?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Los Angeles",
    link: "https://images.unsplash.com/photo-1495430288918-03be19c7c485?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Space Needle Seattle",
    link: "https://images.unsplash.com/photo-1604435317654-a4d3ab2e3dc2?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "The Chicago Theatre",
    link: "https://images.unsplash.com/photo-1532799749305-ff96b2b642e9?q=80&w=1365&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Time Square New York",
    link: "https://images.unsplash.com/photo-1503179579247-e6946936f17b?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Washington D.C.",
    link: "https://images.unsplash.com/photo-1599066634419-0e3572eeb169?q=80&w=1465&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

// Form Selectors
export const formList = document.querySelectorAll(".modal__form");

// Profile Selectors
export const profileEditModal = document.querySelector("#profile__edit-modal");
export const profileEditButton = document.querySelector(
  "#profile__edit-button"
);
export const profileTitleInput = document.querySelector(
  "#profile__title-input"
);
export const profileDescriptionInput = document.querySelector(
  "#profile__description-input"
);

// Card Selectors
export const addCardModal = document.querySelector("#add-card-modal");
export const addCardButton = document.querySelector(
  "#profile__add-card-button"
);

// Input Selectors
export const nameInput = document.querySelector("[name='name']");
export const aboutInput = document.querySelector("[name='about']");
