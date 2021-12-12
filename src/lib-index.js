import './sass/main.scss';
import { allFilms } from './index';
import libraryFilms from './js/library';

if (window.location.pathname.includes('my-library')) {
  allFilms.currentPage = 1;
  libraryFilms();
}

const watchedFilterButton = document.querySelector('.watched');
const queueFilterButton = document.querySelector('.queue');

watchedFilterButton.addEventListener('click', event => {
  event.target.disabled = true;
  queueFilterButton.disabled = false;
  allFilms.currentPage = 1;
  document.querySelector('.page-input').value = 1;
  libraryFilms();
});
queueFilterButton.addEventListener('click', event => {
  event.target.disabled = true;
  watchedFilterButton.disabled = false;
  allFilms.currentPage = 1;
  document.querySelector('.page-input').value = 1;
  libraryFilms();
});
