import './sass/main.scss';
import { allFilms } from './index';
import libraryFilms from './js/library';

if (window.location.pathname.contains('my-library.html')) {
  allFilms.currentPage = 1;
  libraryFilms();
}

const watchedFilterButton = document.querySelector('.watched');
const queueFilterButton = document.querySelector('.queue');

watchedFilterButton.addEventListener('click', event => {
  event.target.disabled = true;
  queueFilterButton.disabled = false;
  libraryFilms();
});
queueFilterButton.addEventListener('click', event => {
  event.target.disabled = true;
  watchedFilterButton.disabled = false;
  libraryFilms();
});
