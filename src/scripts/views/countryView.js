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
    this.#generateMap(data);
  }

  renderError(errorMsg) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error';
    errorElement.textContent = errorMsg;
    this.#parentElement.append(errorElement);
  }

  #cloneTemplate() {
    const cloneTemp = this.#cardTemplate.content.cloneNode(true).children[0];
    cloneTemp.querySelector('[data-name]').textContent = this.#data.name;
    cloneTemp.querySelector(
      '[data-population]'
    ).textContent = `${this.#formatPopulation()}`;
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

  #formatPopulation() {
    if (this.#data.population > 1_000_000_000) {
      return `${(this.#data.population / 1_000_000_000).toFixed(1)}B`;
    }
    if (this.#data.population > 1_000_000) {
      return `${(this.#data.population / 1_000_000).toFixed(1)}M`;
    }
    return this.#data.population;
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

  #generateMap(data) {
    // import of leaflet (L) library is in vendor.js
    const icon = L.icon({
      iconSize: [38, 95],
      iconAnchor: [22, 94],
      popupAnchor: [-3, -76],
      html: '',
    });
    const map = L.map('map').setView(this.#data.coords, 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker(this.#data.coords, { draggable: true, icon: L.divIcon(icon) })
      .addTo(map)
      .bindPopup(`${data.name}`)
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
