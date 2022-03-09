import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

class CountryView {
  #parentElement = document.querySelector('.countries');

  #cardTemplate = document.querySelector('[data-card-template]');

  #data;

  #dataAll;

  render(data, dataAll) {
    this.#data = data;
    this.#dataAll = dataAll;
    const card = this.#cloneTemplate();
    this.#parentElement.innerHTML = '';
    this.#parentElement.append(card);
    this.#generateMap();
  }

  #cloneTemplate() {
    const cloneTemp = this.#cardTemplate.content.cloneNode(true).children[0];
    cloneTemp.querySelector('[data-name]').textContent = this.#data.name;
    cloneTemp.querySelector('[data-population]').textContent =
      this.#data.population;
    cloneTemp.querySelector('[data-region]').textContent = this.#data.region;
    cloneTemp.querySelector('[data-capital]').textContent =
      this.#data.capital ?? '\u2205';

    if (this.#data.borders) {
      const borders = cloneTemp.querySelector('[data-borders]');
      this.#generateBorders().forEach(borderElement => {
        borders.append(borderElement);
      });
    }

    cloneTemp
      .querySelector('[data-flag]')
      .style.setProperty('background-image', `url(${this.#data.flag})`);

    return cloneTemp;
  }

  #generateBorders() {
    return this.#data.borders.map(countryCode => {
      const borderElement = document.createElement('div');
      borderElement.className = 'border-country';
      const countryObj = this.#dataAll.find(
        country => country.code === countryCode
      );
      borderElement.style.setProperty(
        'background-image',
        `url(${countryObj.flag})`
      );
      borderElement.dataset.countryCode = countryObj.code.toLowerCase();
      return borderElement;
    });
  }

  #generateMap() {
    const map = L.map('map').setView(this.#data.coords, 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker(this.#data.coords)
      .addTo(map)
      .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
      .openPopup();
  }

  addBorderClickHandler(handler) {
    this.#parentElement.addEventListener('click', e => {
      const border = e.target.closest('.border-country');
      if (!border) return;
      handler(border.dataset.countryCode);
    });
  }
}

export default new CountryView();
