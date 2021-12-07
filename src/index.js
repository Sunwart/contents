import './sass/main.scss';
import filmsAPIService from './js/API-service';
import render from './js/rendering';
import { searchFilms } from './js/search';

const trendingFilms = new filmsAPIService();

//ПЕРША ЗАГРУЗКА
trendingFilms
  .getTrendingFilms()
  .then(res => {
    const data = {
      totalpages: res.data.total_pages,
      total_results: res.data.total_results,
      page: res.data.page,
      films: res.data.results,
    };
    return data;
  })
  .then(render);

//РЕАЛІЗАЦІЯ ПОШУКУ (без рендерінгу розмітки)
const searchInput = document.querySelector('.search-form');
searchInput.addEventListener('submit', searchFilms);

// firstLoadFilms.page = 3; //приклад використання для пагінації
// firstLoadFilms.language = 'fr'; //приклад використання для локалізації

//приклад використання - витягнути дані одного фільму по його id
// trendingFilms.getSingleFilmByID(448021).then(res => console.log('окремий фільм:', res.data));
// підказки тут https://docs.google.com/document/d/1Hrx6Rgc6hSu4L69pmSNMm8UyLrBKyviCQcfNAZEx5Q4/edit?usp=sharing
