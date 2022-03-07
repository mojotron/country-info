import '../styles/main.css';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import * as Model from './model';
import SearchView from './views/searchView';
import MatchView from './views/matchView';

const countries = document.querySelector('.countries');
const cardTemplate = document.querySelector('[data-card-template]');

const renderCountry = data => {
  const clone = cardTemplate.content.cloneNode(true).children[0];
  clone.querySelector('[data-name]').textContent = data.name;
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

const controlSearchInput = value => {
  const data = Model.state.countries
    .filter(country =>
      country.name.toLowerCase().startsWith(value.toLowerCase())
    )
    .map(country => country.name);
  MatchView.matchResults(data);
};

const controlSearch = value => {
  MatchView.clearResults();
  getCountryData(value);
};

const init = () => {
  SearchView.addHandlerInput(controlSearchInput);
  SearchView.addHandlerSubmit(controlSearch);
  MatchView.addMatchClickHandler(controlSearch);
};

init();
