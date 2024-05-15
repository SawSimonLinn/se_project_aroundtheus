class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;

    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  // Get the card template
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card__list-item")
      .cloneNode(true);

    return cardElement;
  }

  // Set event listeners
  _setEventListeners() {
    this._likeButton.addEventListener("click", () => this._handleLikeIcon());
    this._deleteButton.addEventListener("click", () => this._handleDeleteCard());
    this._cardImageElement.addEventListener("click", () => {
      this._handleImageClick({
      name: this._name,
      link: this._link
      })
    });
  }

  // Like card
  _handleLikeIcon() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  // Delete card
  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }


  getCardElement() {
    // Create the card element
    this._cardElement = this._getTemplate();

    // Get the card elements
    this._likeButton = this._cardElement.querySelector("#card__like-button");
    this._deleteButton = this._cardElement.querySelector("#card__delete-button");
    this._cardImageElement = this._cardElement.querySelector("#card__image");
    this._cardTitleElement = this._cardElement.querySelector("#card__title");

    // Set the card data
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._name;
    this._cardTitleElement.textContent = this._name;

    this._setEventListeners();

    return this._cardElement;
  }
}

export default Card;
