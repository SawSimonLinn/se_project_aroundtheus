class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;

    this._cardSelector = cardSelector;
    this._handeImageClick = handleImageClick;
  }
  _setEventListeners() {
    this._likeButton = this._cardElement.querySelector("#card__like-button");
    this._deleteButton = this._cardElement.querySelector(
      "#card__delete-button"
    );

    this._likeButton.addEventListener("click", () => this.handleLikeIcon());
    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteCard()
    );

    this._cardImageElement.addEventListener("click", () => {
      this._handleImageClick(this);
    });
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

  getCardElement() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card__list-item")
      .cloneNode(true);

    this._cardImageElement = this._cardElement.querySelector("#card__image");
    this._cardTitleElement = this._cardElement.querySelector("#card__title");

    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._name;
    this._cardTitleElement.textContent = this._name;

    this._setEventListeners();
  }
}

export default Card;
