import { MATCH_CLASS_NAME } from '../config';

class SearchView {
  #parentElement = document.querySelector('.header__search');

  #inputElement = document.querySelector('#search');

  addHandlerInput(handler) {
    this.#inputElement.addEventListener('input', e => {
      handler(e.target.value);
    });
  }

  clearInput() {
    this.#inputElement.value = '';
  }

  addHandlerSubmit(handler) {
    this.#parentElement.addEventListener('submit', e => {
      e.preventDefault();
      const firstMatch = document.querySelector(`.${MATCH_CLASS_NAME}`);
      if (!firstMatch) return;
      this.clearInput();
      handler(firstMatch.dataset.countryCode);
    });
  }
}

export default new SearchView();
