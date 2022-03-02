import '../styles/main.css';

const URL_API = `https://restcountries.com/v3.1/all`;
// const state = {};

const generateMarkdown = data => `
  <div class="country__flag"></div>
  <div class="country__info">
    <p>name: <span class="country__info__name">${data.name.common}</span></p>
    <p>region: <span class="country__info__region">${data.region}</span></p>
    <p>population: <span class="country__info__population">${
      data.population
    }</span></p>
    <p>neighbors: <span class="country__info__neighbors">${data.borders?.join(
      ', '
    )}</span></p>
  </div>
`;

const renderCountry = data => {
  const ele = document.createElement('div');
  ele.className = 'country';
  ele.insertAdjacentHTML('afterbegin', generateMarkdown(data));
  ele
    .querySelector('.country__flag')
    .style.setProperty('background-image', `url(${data.flags.png})`);
  document.body.append(ele);
};

const getData = async url => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    data.forEach(element => renderCountry(element));
  } catch (error) {
    console.log(error);
  }
};

getData(URL_API);
