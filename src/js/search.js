import filmsAPIService from './API-service';
import render from './rendering';
import scrolling from './scroll';

const films = new filmsAPIService();

const pageInput = document.querySelector('.page-input');
const backwardArrow = document.querySelector('.backward');
const forwardArrow = document.querySelector('.forward');

pageInput.addEventListener('change', onPageChange);
backwardArrow.addEventListener('click', onBackwardArrowClick);
forwardArrow.addEventListener('click', onForwardArrowClick);

export const searchFilms = function (event) {
  event.preventDefault();
  onValidSearchQuery();
  films.query = event.target.firstElementChild.value;
  films.page = 1;
  films.pagesNumber = 0;
  films
    .getFilmsByQuery(event.target.firstElementChild.value)
    .then(res => {
      if (res.data.total_results === 0) {
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
      films.allPages = data.total_pages;
      document.querySelector('.pages-number').innerHTML = 'of ' + data.total_pages;
    })
    .catch(error => {
      onInvalidSearchQuery();
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

function onPageChange(event) {
  document.querySelector('.search-form').value = films.query;
  films.page = Number(event.target.value);
  films
    .getFilmsByQuery(films.query)
    .then(res => {
      const data = {
        total_pages: res.data.total_pages,
        page: res.data.page,
        films: res.data.results,
      };
      return data;
    })
    .then(render);
  scrolling();
}

function onBackwardArrowClick(event) {
  if (films.page > 1) {
    document.querySelector('.search-form').value = films.query;
    films.page -= 1;
    films
      .getFilmsByQuery(films.query)
      .then(res => {
        const data = {
          total_pages: res.data.total_pages,
          page: res.data.page,
          films: res.data.results,
        };
        return data;
      })
      .then(render);
    pageInput.value = films.page;
    scrolling();
  }
}

function onForwardArrowClick(event) {
  if (films.page < films.allPages) {
    document.querySelector('.search-form').value = films.query;
    films.page += 1;
    films
      .getFilmsByQuery(films.query)
      .then(res => {
        const data = {
          total_pages: res.data.total_pages,
          page: res.data.page,
          films: res.data.results,
        };
        return data;
      })
      .then(render);
    pageInput.value = films.page;
    scrolling();
  }
}
