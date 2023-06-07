export default class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    handleDeleteCard,
    handleAddLikeCard,
    handleRemoveLikeCard,
    userId
  ) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleAddLikeCard = handleAddLikeCard;
    this._handleRemoveLikeCard = handleRemoveLikeCard;

    this._name = data.name;
    this._alt = data.name;
    this._link = data.link;

    this._likes = data.likes || [];
    this._cardOwner = data.owner._id;
    this._userId = userId;
    this._cardId = data._id;

    this._element = this._getTemplate();
    this._title = this._element.querySelector(".element__title");
    this._image = this._element.querySelector(".element__photo");
    this._buttonDelete = this._element.querySelector(".element__button-delete");
    this._buttonLike = this._element.querySelector(".element__button-like");
    this._likesCount = this._element.querySelector(".element__number-like");
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

  // генерирует DOM-элемент карточки и устанавливает обработчики событий
  generateCard() {
    this._image.src = this._link;
    this._image.alt = this._name;
    this._title.textContent = this._name;

    this._likes = this._data.likes;
    this._likesCount.textContent = this._likes.length;

    this._setEventListeners();
    this._handleButtonDelete();
    this._updateLikesCount();

    return this._element;
  }

  _setEventListeners() {
    // слушатель открытия увеличенной карточки по клику на изображение
    this._image.addEventListener("click", () => {
      this._handleCardClick({ name: this._name, link: this._link });
    });

    // слушатель удаление карточки
    this._buttonDelete.addEventListener("click", () => {
      this._handleDeleteCard(this._cardId, this);
    });
    // слушатель лайка
    this._buttonLike.addEventListener("click", () => {
      if (this._buttonLike.classList.contains("element__button-like_activ")) {
        this._handleRemoveLikeCard(this._cardId, this);
      } else {
        this._handleAddLikeCard(this._cardId, this);
      }
    });
  }

  // проверяем, лайкнута ли карточка пользователем
  isLikedByUser() {
    return this._likes.some((like) => like._id === this._userId);
  }

  // обновление данных о лайках на основе полученных данных с сервера
  updateLikes(data) {
    this._likes = data.likes;
    this._updateLikesCount();
  }

  // отображение количества лайков и замена цвета лайка
  _updateLikesCount() {
    this._likesCount.textContent = this._likes.length;

    if (this.isLikedByUser()) {
      this._buttonLike.classList.add("element__button-like_activ");
    } else {
      this._buttonLike.classList.remove("element__button-like_activ");
    }
  }
  // удаляем DOM-элемент карточки
  deleteCard() {
    this._element.remove();
  }

  // проверяем владельца карточки и убираем кнопку корзинки
  _handleButtonDelete() {
    if (this._userId !== this._cardOwner) {
      this._buttonDelete.remove();
    }
  }
}
