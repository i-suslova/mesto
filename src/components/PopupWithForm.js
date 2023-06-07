import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleSubmitForm }) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._submitForm = this._submitForm.bind(this);
    this._form = this._popup.querySelector(".popup__form");
    this._inputs = Array.from(this._form.querySelectorAll(".popup__input"));
    this._submitButton = this._form.querySelector(".popup__button");
    this._initialText = this._submitButton.textContent;
  }

  _submitForm = (evt) => {
    evt.preventDefault();
    const initialButtonText = this._submitButton.textContent;
    this._submitButton.textContent = "Сохранение...";
    this._handleSubmitForm(this._getInputValues())
      .then(() => {
        this._submitButton.textContent = initialButtonText;
        this.close();
      })
      .catch((error) => {
        console.error(error);
        this._submitButton.textContent = initialButtonText;
      });
  };

  // получаем значения полей формы
  _getInputValues() {
    const values = {};
    this._inputs.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._submitForm);
  }

  // устаноавливаем значения полей формы
  setInputValues(data) {
    this._inputs.forEach((input) => {
      input.value = data[input.name];
    });
  }

  // закрываем попап и сбросываем инпуты
  close() {
    super.close();
    this._form.reset();
  }
}
