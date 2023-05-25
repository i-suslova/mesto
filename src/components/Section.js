export default class Section {
  constructor({ renderer }, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renderItems(data, userId) {
    data.forEach((data) => {
      this._renderer(data, userId);
    });
  }

  appendItem(cardElement) {
    this._container.append(cardElement);
  }

  prependItem(cardElement) {
    this._container.prepend(cardElement);
  }
}
