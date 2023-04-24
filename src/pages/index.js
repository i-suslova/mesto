import "./index.css";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

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

//генерируем коарту  и добавляем в DOM
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

//создаем экземпляр карты, который принимает данные и шаблон
function getCard(data, templateSelector, handleCardClick) {
  const card = new Card(data, templateSelector, () => {
    handleCardClick(data);
  });
  const cardElement = card.generateCard();

  return cardElement;
}

function handlePictureFormSubmit(evt, data) {
  evt.preventDefault();
  const newCard = getCard(data, "#template", handleCardClick);
  section.prependItem(newCard);
  popupAddCard.close();
}

function handleProfileFormSubmit(evt, data) {
  evt.preventDefault();

  userInfo.setUserInfo({
    name: data.nameInput,
    info: data.jobInput,
  });
  popupEditProfile.close();
}

profileForm.addEventListener("submit", (evt) =>
  handleProfileFormSubmit(evt, {
    nameInput: nameInput.value,
    jobInput: jobInput.value,
  })
);

formPicture.addEventListener("submit", (evt) =>
  handlePictureFormSubmit(evt, {
    name: pictureInput.value,
    link: linkInput.value,
  })
);

const popupEditProfile = new PopupWithForm(".popup_profile", {
  handleSubmitForm: handleProfileFormSubmit,
});

popupEditProfile.setEventListeners();

const popupAddCard = new PopupWithForm(".popup_picture", {
  handleSubmitForm: handlePictureFormSubmit,
});

popupAddCard.setEventListeners();

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
