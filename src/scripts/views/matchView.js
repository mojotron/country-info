import { MATCH_CLASS_NAME } from '../config';

class MatchView {
  #parentElement = document.querySelector('.search-match');

  matchResults(data) {
    this.clearResults();
    data.forEach(country => {
      this.#parentElement.append(this.#generateMatchElement(country));
    });
  }

  addMatchClickHandler(handler) {
    this.#parentElement.addEventListener('click', e => {
      const value = e.target.closest(`.${MATCH_CLASS_NAME}`);
      handler(value.dataset.countryCode);
    });
  }

  #generateMatchElement(country) {
    const element = document.createElement('p');
    element.className = MATCH_CLASS_NAME;
    element.textContent = country.name;
    element.dataset.countryCode = country.code;
    return element;
  }

  clearResults() {
    this.#parentElement.innerHTML = '';
  }
}

export default new MatchView();
