export default class Card {
  constructor({ name, link }, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector("#card__like-button")
      .addEventListener("click", () => {
        this.handleLikeIcon();
      });

    this._cardElement
      .querySelector("#card__delete-button")
      .addEventListener("click", this._handleDeleteCard);
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector("#card__like-button")
      .classList.toggle("card__like-button_active");
  }
  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card__list-item")
      .cloneNode(true);

    console.log(this._cardElement);

    this._setEventListeners();
  }
}
