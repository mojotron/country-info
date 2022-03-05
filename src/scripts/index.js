import '../styles/main.css';

const URL_API = `https://restcountries.com/v3.1/all?fields=flags,name,cca3`;
const state = {
  countries: [],
  country: {},
};
const countries = document.querySelector('.countries');
const cardTemplate = document.querySelector('[data-card-template]');

const renderCountry = data => {
  const clone = cardTemplate.content.cloneNode(true).children[0];
  clone.querySelector('.country__info__name').textContent = data.name;
  clone.querySelector('[data-population]').textContent = data.population;
  clone.querySelector('[data-region]').textContent = data.region;
  clone.querySelector('[data-capital]').textContent = data.capital ?? 'X';
  //
  data.borders.forEach(x => {
    const temp = document.createElement('div');
    temp.className = 'test';
    const obj = state.countries.find(ele => ele.code === x);
    temp.style.setProperty('background-image', `url(${obj.flag})`);
    clone.querySelector('[data-borders]').append(temp);
  });
  clone
    .querySelector('[data-flag]')
    .style.setProperty('background-image', `url(${data.flag})`);
  // clone.querySelector('[data-borders]').textContent = data.borders.join(' ');
  countries.innerHTML = '';

  countries.append(clone);
  console.log(data);
};
const getData = async url => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    state.countries = await data.map(element => {
      const {
        flags: { png: flag },
        name: { common: name },
        cca3: code,
      } = element;
      return { name, flag, code };
    });
  } catch (error) {
    console.log(error);
  }
};

getData(URL_API);

const getCountryData = async countryName => {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${countryName}`
    );
    const [data] = await response.json();

    state.country = {
      name: data.name.common,
      flag: data.flags.png,
      population: data.population,
      region: data.region,

      map: data.maps.googleMaps,
      ...(data.borders && { borders: data.borders }),
      ...(data.capital && { capital: data.capital[0] }),
    };

    renderCountry(state.country);
  } catch (error) {
    console.log(error);
  }
};

const inputField = document.querySelector('input');
const searchMatch = document.querySelector('.search-match');

inputField.addEventListener('input', e => {
  searchMatch.innerHTML = '';
  const { value } = e.target;
  state.countries.forEach(ele => {
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
