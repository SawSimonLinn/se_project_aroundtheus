import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit, formType) {
    super({ popupSelector });
    this._form = this.popupElement.querySelector(".modal__form");
    this._inputList = this._form.querySelectorAll(".modal__input");
    this._handleFormSubmit = handleFormSubmit;
    this.formType = formType;
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    if (this.formType === "card-form") {
      this._form.reset();
      console.log("form reset");
    }
  }
}

export default PopupWithForm;
