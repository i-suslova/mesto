import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

import {
  initialCards,
  config,
  profileEditButton,
  profileAddButton,
  popupProfile,
  profileForm,
  nameInput,
  jobInput,
  profileTitle,
  profileSubtitle,
  popupPicture,
  formPicture,
  pictureInput,
  linkInput,
} from "../utils/constants.js";

//создаем экземпляр класса PopupWithImage и добавляет к нему слушатель событий
const popupWithImage = new PopupWithImage(".popup_image");
popupWithImage.setEventListeners();

//создаем экземпляр класса UserInfo, который отвечает за отображение информации о пользователе
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__subtitle",
});

//открываем экземпляр PopupWithImage, при клике на карточку
function handleCardClick(data) {
  popupWithImage.open(data);
}

//генерируем карту и добавляем в DOM
function renderCard(data) {
  const cardElement = getCard(data, "#template", handleCardClick);
  section.appendItem(cardElement);
}

//создаем экземпляр класса Section, который отображает список карточек
const section = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  ".elements"
);
section.renderItems();

function getCard(data, templateSelector, handleCardClick) {
  const card = new Card(data, templateSelector, (data) => {
    handleCardClick(data);
  });
  const cardElement = card.generateCard();
  return cardElement;
}

const popupAddCard = new PopupWithForm(".popup_picture", {
  handleSubmitForm: (data) => {
    const newCard = getCard(
      {
        name: data.name,
        link: data.url,
      },
      "#template",
      handleCardClick
    );

    section.prependItem(newCard);
  },
});
popupAddCard.setEventListeners();



const popupEditProfile = new PopupWithForm(".popup_profile", {
  handleSubmitForm: (data) => {
    userInfo.setUserInfo({
      name: data.name,
      info: data.job,
    });
  },
});
popupEditProfile.setEventListeners();

 // Создаем попап с подтверждением удаления карточки
// const popupDeleteCard = new PopupWithForm('.popup_picture-delete', {

//   handleSubmitForm: handleCardDelete
// });

// popupDeleteCard .setEventListeners();



profileEditButton.addEventListener("click", () => {
  profileFormValidator.resetValidation(); // Сбрасываем ошибки и состояние кнопки
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  //Они добавляют прослушиватели событий в профиль и формы изображений
  //для запуска handleProfileFormSubmitи handlePictureFormSubmitфункций при отправке форм.
  popupEditProfile.open();
});

profileAddButton.addEventListener("click", () => {
  pictureFormValidator.resetValidation(); // Сбрасываем ошибки и состояние кнопки
  popupAddCard.open();
});

// Создание экземпляра класса FormValidator для валидации формы профиля
const profileFormValidator = new FormValidator(config, popupProfile);
profileFormValidator.enableValidation();

// Создание экземпляра класса FormValidator для валидации формы добавления фотографии
const pictureFormValidator = new FormValidator(config, popupPicture);
pictureFormValidator.enableValidation();


