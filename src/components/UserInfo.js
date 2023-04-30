export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._jobSelector = jobSelector;
    this._nameSelector = nameSelector;
    this._nameElement = document.querySelector(nameSelector);
    this._jobnameElement = document.querySelector(jobSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      info: this._jobnameElement.textContent,
    };
  }

  setUserInfo({ name, info }) {
    this._nameElement.textContent = name;
    this._jobnameElement.textContent = info;
  }
}
