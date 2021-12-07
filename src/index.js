import './sass/main.scss';
import filmsAPIService from './js/API-service';
import { searchFilms } from './js/search';
import { popularFilms } from './js/trending-films';

//РЕАЛІЗАЦІЯ ПОШУКУ (без рендерінгу розмітки)
const searchInput = document.querySelector('.search-form');
searchInput.addEventListener('submit', searchFilms);

//ПЕРША ЗАГРУЗКА
document.addEventListener('DOMContentLoaded', popularFilms);
