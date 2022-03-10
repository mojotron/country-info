# Country Info

Goal of this project was learning and implement asynchronous code in JS, and working with REST APIs. For this project [rest countries](https://restcountries.com/) API is used. This API return information's about countries.

After loading the page, application is starting with first async call to the API. Fetching basic data about all countries (name, flag src path, and cca3 country code). This data is used for creating match elements when user starts to type characters in the search bar. Rendering all countries staring with typed pattern is displayed in the list.

User can click on the wanted country in the list or press enter to pick first match.

After selecting country, the application is making second API call to get additional information's for the target country and renders all information's as a card to the screen.

User can click to neighboring countries if any, to rerender new target county or interact with the map.

For the map this project is using [Leaflet](https://leafletjs.com/) library.

### What have I learned

- Basics of asynchronous code in JS.
- Using fetch function
- Using async/await pattern
- Using try/catch block and implementing basic error handling
- throwing and rethrowing errors
- building basic search functionality
- working with REST API and library's, exploring documentation.
- using html template tag and creating dynamic elements using document fragment and cloneNode method.

For the project architecture it is used MCV pattern and publisher-subscriber patterns.
