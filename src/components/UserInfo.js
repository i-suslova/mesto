export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    const userInfo = {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
      avatar: this._avatarElement.src,
    };
    return userInfo;
  }

  setUserInfo(data) {
    this._nameElement.textContent = data.name;
    this._jobElement.textContent = data.about;
    this._avatarElement.src = data.avatar;
  }

  
}
