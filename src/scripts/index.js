import '../styles/main.css';

const URL_API = `https://restcountries.com/v3.1/all?fields=flags,name`;
const state = {
  countries: [],
};

const getData = async url => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    state.countries = await data.map(element => {
      const {
        flags: { png: flagSrc },
        name: { common: name },
      } = element;
      return { name, flagSrc };
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
    console.log(data);
    const country = {
      name: data.name.common,
      flag: data.flags.png,
      population: data.population,
      region: data.region,
      ...(data.borders && { borders: data.borders }),
      ...(data.capital && { capital: data.capital[0] }),
    };
    console.log(country);
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
  // fetch request and modal with all info
});
