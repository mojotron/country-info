import '../styles/main.css';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import * as Model from './model';

const countries = document.querySelector('.countries');
const cardTemplate = document.querySelector('[data-card-template]');

const renderCountry = data => {
  const clone = cardTemplate.content.cloneNode(true).children[0];
  clone.querySelector('.country__info__name').textContent = data.name;
  clone.querySelector('[data-population]').textContent = data.population;
  clone.querySelector('[data-region]').textContent = data.region;
  clone.querySelector('[data-capital]').textContent = data.capital ?? 'X';
  //
  data.borders?.forEach(x => {
    const temp = document.createElement('div');
    temp.className = 'test';
    const obj = Model.state.countries.find(ele => ele.code === x);
    temp.style.setProperty('background-image', `url(${obj.flag})`);
    clone.querySelector('[data-borders]').append(temp);
  });
  // clone.querySelector('[data-borders]').addEventListener('click', e => {
  //   //
  // });
  //
  clone
    .querySelector('[data-flag]')
    .style.setProperty('background-image', `url(${data.flag})`);
  countries.innerHTML = '';

  countries.append(clone);
  console.log(data.coords);
  const map = L.map('map').setView(data.coords, 5);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  L.marker(data.coords)
    .addTo(map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();
  console.log(data);
};

const getCountryData = async countryName => {
  try {
    await Model.loadTargetCountry(countryName);
    renderCountry(Model.state.country);
  } catch (error) {
    console.log(error);
  }
};

const inputField = document.querySelector('input');
const searchMatch = document.querySelector('.search-match');

inputField.addEventListener('input', e => {
  searchMatch.innerHTML = '';
  const { value } = e.target;
  Model.state.countries.forEach(ele => {
    if (ele.name.toLowerCase().startsWith(value.toLowerCase())) {
      const p = document.createElement('p');
      p.className = 'search-result';
      p.textContent = ele.name;
      searchMatch.append(p);
    }
  });
});

document.querySelector('.header__search').addEventListener('submit', e => {
  e.preventDefault();
  getCountryData(document.querySelector('p').textContent);
});

searchMatch.addEventListener('click', e => {
  const country = e.target.closest('p');
  getCountryData(country.textContent);
  searchMatch.innerHTML = '';
});
