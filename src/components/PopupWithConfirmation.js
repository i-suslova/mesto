import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
  }

  setSubmitCallback(action) {
    this._submitCallback = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("click", (evt) => {
      evt.preventDefault();
      this._submitCallback();
    });
  }
}
