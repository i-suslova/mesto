import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleSubmitForm }) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._submitForm = this._submitForm.bind(this);
    this._form = this._popup.querySelector(".popup__form");
    this._submitButton = this._form.querySelector(".popup__button");
  }

  _submitForm(evt) {
    evt.preventDefault();
    this._handleSubmitForm(this._getInputValues(), this._submitButton);
    this.close();
  }

  _getInputValues() {
    const inputs = Array.from(this._form.querySelectorAll(".popup__input"));
    const values = {};
    inputs.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", this._submitForm);
  }

  // Закрытие попапа и сброс инпутов
  close() {
    super.close();
    this._form.reset();
  }
}
