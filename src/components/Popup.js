export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector(".popup__button-close");
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener("mousedown", (evt) => {
      if (
        evt.target === this._popup &&
        this._popup.classList.contains("popup_opened")
      ) {
        this.close();
      }
      if (evt.target === this._closeButton) {
        this.close(evt.target === this._closeButton);
      }
    });
  }
}

