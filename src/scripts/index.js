import '../styles/main.css';

import * as Model from './model';
import SearchView from './views/searchView';
import MatchView from './views/matchView';
import CountryView from './views/countryView';

const loadAndRenderCountry = async countryName => {
  try {
    await Model.loadTargetCountry(countryName);
    CountryView.render(Model.state.country, Model.state.countries);
  } catch (error) {
    console.log(error);
    CountryView.renderError(error.message);
  }
  SearchView.clearInput();
};

const controlSearchInput = value => {
  const data = Model.state.countries.filter(country =>
    country.name.toLowerCase().startsWith(value.toLowerCase())
  );
  MatchView.matchResults(data);
};

const controlSearch = value => {
  MatchView.clearResults();
  loadAndRenderCountry(value);
};

const controlBorderClick = value => {
  loadAndRenderCountry(value);
};

const init = () => {
  SearchView.addHandlerInput(controlSearchInput);
  SearchView.addHandlerSubmit(controlSearch);
  MatchView.addMatchClickHandler(controlSearch);
  CountryView.addBorderClickHandler(controlBorderClick);
};

init();
