import filmsAPIService from './API-service';
import render from './rendering';
import scrolling from './scroll';

const trendingFilms = new filmsAPIService();
const pageInput = document.querySelector('.page-input');
const backwardArrow = document.querySelector('.backward');
const forwardArrow = document.querySelector('.forward');

pageInput.value = 1;

pageInput.addEventListener('change', onPageChange);
backwardArrow.addEventListener('click', onBackwardArrowClick);
forwardArrow.addEventListener('click', onForwardArrowClick);

export const popularFilms = function () {
  trendingFilms
    .getTrendingFilms()
    .then(res => {
      const data = {
        total_pages: res.data.total_pages,
        page: res.data.page,
        films: res.data.results,
      };
      return data;
    })
    .then(render);
};

function onPageChange(event) {
  trendingFilms.page = Number(event.target.value);
  popularFilms();
  scrolling();
}

function onBackwardArrowClick(event) {
  if (trendingFilms.page > 1) {
    trendingFilms.page -= 1;
    popularFilms();
    pageInput.value = trendingFilms.page;
    scrolling();
  }
}

function onForwardArrowClick(event) {
  if (trendingFilms.page < trendingFilms.allPages) {
    trendingFilms.page += 1;
    popularFilms();
    pageInput.value = trendingFilms.page;
    scrolling();
  }
}

document.querySelector('.search-form').addEventListener('submit', () => {
  pageInput.removeEventListener('change', onPageChange);
  backwardArrow.removeEventListener('click', onBackwardArrowClick);
  forwardArrow.removeEventListener('click', onForwardArrowClick);
  pageInput.value = 1;
});
