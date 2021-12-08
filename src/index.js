import './sass/main.scss';
import filmsAPIService from './js/API-service';
import { searchFilms } from './js/search';
import { popularFilms } from './js/trending-films';
import './js/pagination';

export const allFilms = new filmsAPIService();

allFilms.getGenres();

//ПЕРША ЗАГРУЗКА
document.addEventListener('DOMContentLoaded', popularFilms);

//РЕАЛІЗАЦІЯ ПОШУКУ (без рендерінгу розмітки)
const searchInput = document.querySelector('.search-form');
searchInput.addEventListener('submit', searchFilms);
