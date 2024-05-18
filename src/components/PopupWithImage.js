import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor({ popupSelector, imageSelector, captionSelector }) {
    super({ popupSelector });
    this._image = this.popupElement.querySelector(imageSelector);
    this._caption = this.popupElement.querySelector(captionSelector);
  }

  open({ name, link }) {
    this._image.src = link;
    this._image.alt = name;
    this._caption.textContent = name;
    super.open();
  }
}
export default PopupWithImage;
