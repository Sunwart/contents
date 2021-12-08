import { allFilms } from '../index';
import { popularFilms } from './trending-films';

import render from './rendering';

const pageInput = document.querySelector('.page-input');
const backwardArrow = document.querySelector('.backward');
const forwardArrow = document.querySelector('.forward');

pageInput.addEventListener('change', onPageChange);
backwardArrow.addEventListener('click', onBackwardArrowClick);
forwardArrow.addEventListener('click', onForwardArrowClick);

function onPageChange(event) {
  const page = Number(event.target.value);
  if (page > allFilms.allPages || page < 1) {
    return;
  }
  allFilms.currentPage = page;
  reloadFilms();
  scrolling();
}

function onBackwardArrowClick(event) {
  if (allFilms.currentPage > 1) {
    allFilms.currentPage -= 1;
    reloadFilms();
    pageInput.value = allFilms.currentPage;
    scrolling();
  }
}

function onForwardArrowClick(event) {
  if (allFilms.currentPage < allFilms.allPages) {
    allFilms.currentPage += 1;
    reloadFilms();
    pageInput.value = allFilms.currentPage;
    scrolling();
  }
}

function reloadFilms() {
  if (allFilms.allPages === 1000) {
    popularFilms();
  } else {
    document.querySelector('.search-form').value = allFilms.searchQuery;
    allFilms
      .getFilmsByQuery()
      .then(res => {
        const data = {
          total_pages: res.data.total_pages,
          page: res.data.page,
          films: res.data.results,
        };
        return data;
      })
      .then(render);
  }
}

function scrolling() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
