import "./index.css";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

import {
  config,
  profileEditAvatarButton,
  profileEditButton,
  profileAddButton,
  popupProfile,
  popupAvatar,
  popupPicture
} from "../utils/constants.js";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-66",
  headers: {
    authorization: "a6201408-149a-4017-8f2e-d2f94e8d9514",
    "Content-Type": "application/json",
  },
});

// объявляем переменную userId
let userId;

const returnPromise = async () => {
  try {
    const { userData, cardData } = await api.getAllNeedData();
    userInfo.setUserInfo(userData);
    userId = userData._id;
    section.renderItems(cardData, userId);
  } catch (error) {
    console.error(error);
  }
};
returnPromise();

//экземпляр класса UserInfo, который отвечает за отображение информации о пользователе
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__subtitle",
  avatarSelector: ".profile__avatar",
});

function getCard(
  data,
  templateSelector,
  handleCardClick,
  handleDeleteCard,
  userId
) {
  const handleAddLikeCard = async (cardId, card) => {
    try {
      if (card.isLikedByUser()) {
        const data = await api.deleteLike(cardId);
        card.updateLikes(data);
      } else {
        const data = await api.addLike(cardId);
        card.updateLikes(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveLikeCard = async (cardId, card) => {
    try {
      const data = await api.deleteLike(cardId);
      card.updateLikes(data);
    } catch (error) {
      console.error(error);
    }
  };

  const card = new Card(
    data,
    templateSelector,
    handleCardClick,
    handleDeleteCard,
    handleAddLikeCard,
    handleRemoveLikeCard,
    userId,
    data._id,
    data.likes
  );

  const cardElement = card.generateCard();

  return cardElement;
}

//экземпляр класса Section, который отображает список карточек
const section = new Section({ renderer: renderCard }, ".elements");

function renderCard(data, userId) {
  const cardElement = getCard(
    data,
    "#template",
    handleCardClick,
    handleDeleteCard,
    userId
  );

  section.appendItem(cardElement);
}

//  обрабатываем клик на кнопке удаления карточки
async function handleDeleteCard(cardId, card) {
  try {
    popupDeleteCard.open();

    popupDeleteCard.setSubmitCallback(async () => {
      try {
        await api.deletePersonalCard(cardId);

        card.deleteCard();
        popupDeleteCard.close();
      } catch (error) {
        console.error(error);
      }
    });
  } catch (error) {
    console.error(error);
  }
}

//обрабатываем клик на карточке и открывает увеличенныое изображением карточки
function handleCardClick(data) {
  popupWithImage.open(data);
}

const popupAddCard = new PopupWithForm(".popup_picture", {
  handleSubmitForm: async (data) => {
    try {
      const cardData = await api.addCard(data);
      section.prependItem(
        getCard(
          cardData,
          "#template",
          handleCardClick,
          handleDeleteCard,
          userId,
          cardData.id
        )
      );
      // возвращаем данные для цепочки промисов
      return cardData;
    } catch (error) {
      console.error(error);
    }
  },
});

// экземпляр класса подтверждения удаления карточки
const popupDeleteCard = new PopupWithConfirmation(".popup_picture-delete");

// экземпляр класса редакции профиля
const popupEditProfile = new PopupWithForm(".popup_profile", {
  handleSubmitForm: async (data) => {
    try {
      const userData = await api.getUserId(data);
      userInfo.setUserInfo(userData);
      // возвращаем данные для цепочки промисов
      return userData;
    } catch (error) {
      console.error(error);
    }
  },
});

const popupEditAvatar = new PopupWithForm(".popup_avatar", {
  handleSubmitForm: async (data) => {
    try {
      const responseData = await api.editAvatar(data);
      // обновлеяем ысю информацию о пользователе
      userInfo.setUserInfo(responseData);
      // возвращаем данные для цепочки промисов
      return responseData;
    } catch (error) {
      console.error(error);
    }
  },
});

// экземпляр класса отвечает за увеличенную картинку
const popupWithImage = new PopupWithImage(".popup_image");

// обработываем клик на кнопку редактирования аватара
profileEditAvatarButton.addEventListener("click", () => {
  avatarFormValidator.resetValidation();
  popupEditAvatar.open();
});

// обработываем клик на кнопку редактирования профиля
profileEditButton.addEventListener("click", () => {
  profileFormValidator.resetValidation(); // Сбрасываем ошибки и состояние кнопки
  const infoObject = userInfo.getUserInfo();
  popupEditProfile.setInputValues(infoObject);
  popupEditProfile.open();
});

// обработываем клик на кнопку добавления карточки
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

// Создание экземпляра класса FormValidator для валидации формы аватара пользователя
const avatarFormValidator = new FormValidator(config, popupAvatar);
avatarFormValidator.enableValidation();

popupAddCard.setEventListeners();
popupDeleteCard.setEventListeners();
popupEditProfile.setEventListeners();
popupEditAvatar.setEventListeners();
popupWithImage.setEventListeners();
