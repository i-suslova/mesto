export default class Section {
  constructor({ items, renderer }, selector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  appendItem(cardElement) {
    this._container.append(cardElement);
  }

  prependItem(cardElement) {
    this._container.prepend(cardElement);
  }
}
