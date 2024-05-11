class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;

    this._cardSelector = cardSelector;
    this._handeImageClick = handleImageClick;
  }

  _setEventListeners() {
    _likeButton.addEventListener("click", () => this.handleLikeIcon());

    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteCard()
    );

    this._cardImageElement.addEventListener("click", () => {
      this._handleImageClick(this);
    });
  }

  _handleLikeIcon() {
    this._cardSelector
      .querySelector("#card__like-button")
      .classList.toggle("card__like-button_active");
  }
  _handleDeleteCard() {
    this._cardSelector.remove();
    this._cardSelector = null;
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card__list-item")
      .cloneNode(true);

    this._cardImageElement = this._cardElement.querySelector("#card__image");
    this._cardTitleElement = cardElement.querySelector("#card__title");
    this._likeButton = this._cardElement.querySelector("#card__like-button");
    this._deleteButton = this._cardElement.querySelector(
      "#card__delete-button"
    );

    this._cardTitleElementcardImageElement.src = data.link;
    this._cardTitleElementcardImageElement.alt = data.name;
    this._cardTitleElementcardTitleElement.textContent = data.name;

    this._setEventListeners();
  }
}

export default Card;
