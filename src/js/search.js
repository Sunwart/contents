import { allFilms } from '../index';
import render from './rendering';

export const searchFilms = function (event) {
  event.preventDefault();

  allFilms.searchQuery = event.target.firstElementChild.value.trim();
  if (event.target.firstElementChild.value === ' ') {
    onInvalidSearchQuery();
    return;
  }

  onValidSearchQuery();

  document.querySelector('.page-input').value = 1;
  allFilms.currentPage = 1;
  allFilms.allPages = 1;

  allFilms
    .getFilmsByQuery()
    .then(res => {
      if (res.data.total_results === 0) {
        allFilms.allPages = 0;
        onInvalidSearchQuery();
        return error;
      }
      const data = {
        total_pages: res.data.total_pages,
        page: res.data.page,
        films: res.data.results,
      };
      return data;
    })
    .then(render)
    .then(data => {
      allFilms.allPages = data.total_pages;
      document.querySelector('.pages-number').innerHTML = 'of ' + data.total_pages;
    })
    .catch(error => {
      onInvalidSearchQuery();
      console.log(error);
    });
};

const onInvalidSearchQuery = function () {
  document.querySelector('.search-notification').innerHTML =
    'Search result was NOT successful. Enter the correct movie name and try again!';
  document.querySelector('.films').innerHTML = '';
  document.querySelector('.pages-number').innerHTML = '';
};

const onValidSearchQuery = function () {
  document.querySelector('.search-notification').innerHTML = '';
};
