export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._alt = data.name;
    this._link = data.link;

    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;

    this._element = this._getTemplate();
    this._title = this._element.querySelector(".element__title");
    this._image = this._element.querySelector(".element__photo");
    this._buttonDelete = this._element.querySelector(".element__button-delete");
    this._buttonLike = this._element.querySelector(".element__button-like");
  }

  // забираем разметку из HTML и клонируем элемент
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      //извлечём содержимое template-элемента
      .content.querySelector(".element")
      .cloneNode(true);

    // вернём DOM-элемент карточки
    return cardElement;
  }

  generateCard() {
    this._image.src = this._link;
    this._image.alt = this._name;
    this._title.textContent = this._name;

    this._setEventListeners();

    // Вернём элемент наружу
    return this._element;
  }

  _setEventListeners() {
    this._image.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });

    //  удаление карточки
    this._buttonDelete.addEventListener("click", () => {
      this._handleButtonDelete();
    });

    //возможность ставить лайк
    this._buttonLike.addEventListener("click", () => {
      this._handleButtonLike();
    });
  }

  _handleButtonDelete() {
    this._element.remove();
  }

  _handleButtonLike() {
    this._buttonLike.classList.toggle("element__button-like_activ");
  }
}
