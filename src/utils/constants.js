// для валидации форм
export const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// кнопки
export const profileEditButton = document.querySelector(
  ".profile__button-edit"
);
export const profileAddButton = document.querySelector(".profile__button-add");
export const popupList = document.querySelectorAll(".popup");
export const cardDeleteButton = document.querySelector(
  ".element__button-delete"
);
export const profileEditAvatarButton = document.querySelector(
  ".profile__avatar-button"
);

// pop-up-profile
export const popupProfile = document.querySelector(".popup_profile");
export const profileForm = document.forms["form-profile"];
export const nameInput = document.querySelector("#input-name");
export const jobInput = document.querySelector("#input-job");
export const profileTitle = document.querySelector(".profile__title");
export const profileSubtitle = document.querySelector(".profile__subtitle");
export const profileAvatar = document.querySelector(".profile__avatar");

// pop-up-формы для создания карточек
export const popupPicture = document.querySelector(".popup_picture");
export const formPicture = document.forms["form-picture"];
export const pictureInput = document.querySelector("#input-picture");
export const linkInput = document.querySelector("#input-link");

// template
export const elements = document.querySelector(".elements");

// pop-up-с увеличенной карточкой-
export const popupImage = document.querySelector(".popup_image");
export const popupImagePhoto = popupImage.querySelector(".popup__image-photo");
export const popupImageText = popupImage.querySelector(".popup__image-text");

// pop-up-формы для создания аватара
export const popupAvatar = document.querySelector(".popup_avatar");
