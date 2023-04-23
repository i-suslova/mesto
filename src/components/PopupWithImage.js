import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImagePhoto = this._popup.querySelector(".popup__image-photo");
    this._popupImageText = this._popup.querySelector(".popup__image-text");
  }

  //перезаписываем родительский метод
  open(data) {
    this._popupImagePhoto.src = data.link;
    this._popupImagePhoto.alt = data.name;
    this._popupImageText.textContent = data.name;
    super.open();
  }
}
