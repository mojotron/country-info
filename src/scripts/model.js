import { URL_API, URL_API_ALL, URL_API_NAME } from './config';

export const state = {
  countries: [],
  country: {},
};

const getJSON = async url => {
  try {
    const response = await fetch(url);
    // error bad request
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const loadAllCountries = async url => {
  try {
    const data = await getJSON(url);
    state.countries = await data.map(country => {
      const {
        flags: { png: flag },
        name: { common: name },
        cca3: code,
      } = country;
      return { name, flag, code };
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const loadTargetCountry = async country => {
  try {
    const [data] = await getJSON(URL_API + URL_API_NAME + country);

    state.country = {
      name: data.name.common,
      flag: data.flags.png,
      population: data.population,
      region: data.region,

      coords: data.latlng,
      ...(data.borders && { borders: data.borders }),
      ...(data.capital && { capital: data.capital[0] }),
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const init = () => {
  loadAllCountries(URL_API + URL_API_ALL);
};

init();
