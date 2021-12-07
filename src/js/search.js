import filmsAPIService from './API-service';
import render from './rendering';

const films = new filmsAPIService();

export const searchFilms = function (event) {
  event.preventDefault();
  onValidSearchQuery();
  films
    .getFilmsByQuery(event.target.firstElementChild.value)
    .then(res => {
      if (res.data.total_results === 0) {
        onInvalidSearchQuery();
        return error;
      }
      const data = {
        totalpages: res.data.total_pages,
        total_results: res.data.total_results,
        page: res.data.page,
        films: res.data.results,
      };
      return data;
    })
    .then(render)
    .catch(error => {
      onInvalidSearchQuery();
    });
};

const onInvalidSearchQuery = function () {
  document.querySelector('.search-notification').innerHTML =
    'Search result was NOT successful. Enter the correct movie name and try again!';
  document.querySelector('.films').innerHTML = '';
};
const onValidSearchQuery = function () {
  document.querySelector('.search-notification').innerHTML = '';
};
