import { MATCH_CLASS_NAME } from '../config';

class SearchView {
  #parentElement = document.querySelector('.header__search');

  #inputElement = document.querySelector('#search');

  addHandlerInput(handler) {
    this.#inputElement.addEventListener('input', e => {
      handler(e.target.value);
    });
  }

  addHandlerSubmit(handler) {
    this.#parentElement.addEventListener('submit', e => {
      e.preventDefault();
      const firstMatch = document.querySelector(
        `.${MATCH_CLASS_NAME}`
      ).textContent;
      handler(firstMatch);
    });
  }
}

export default new SearchView();
