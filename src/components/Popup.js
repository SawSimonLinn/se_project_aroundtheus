class Popup {
  constructor({ popupSelector }) {
    this.popupElement = document.querySelector(popupSelector);
  }

  open() {
    this.popupElement.classList.add("modal_open");
    document.addEventListener("keydown", this._handleEscClose);
  }
  close() {
    this.popupElement.classList.remove("modal_open");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    this.popupElement.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("modal_open")) {
        this.close();
      }
      if (evt.target.classList.contains("modal__close-button")) {
        this.close();
      }
    });
  }
}

export default Popup;
