import { allFilms } from '../index';
import modal from './modal';

export default function render(data) {
  const markup = data.films
    .map(film => {
      // poster
      if (!film.poster_path) {
        film.poster_url = `src='https://image.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg'`;
      } else {
        film.poster_url = `src='https://www.themoviedb.org/t/p/w500/${film.poster_path}'`;
      }

      //genres
      const temp = [];
      if (film.genre_ids.length === 0) {
        temp.push({ id: 0, name: 'uncategorized' });
      }
      for (let i = 0; i < film.genre_ids.length && i < 2; i += 1) {
        temp.push(...allFilms.allGenres.filter(genre => genre.id === film.genre_ids[i]));
      }
      const genresByNames = temp.map(el => el.name).join(', ');

      //year
      if (!film.release_date) {
        film.year = '';
      } else {
        film.release_date = film.release_date.slice(0, 4);
        film.year = `|<span class="film-year">${film.release_date}</span>`;
      }

      //title
      if (film.title.length > 35) {
        film.title = film.title.slice(0, 35) + '...';
      }
      return `<li class="film-card" data-modal-open="${film.id}">
                    <img ${film.poster_url}
                        alt="${film.title} - movie poster"
                        class="film-card-img"/>
                    <h3 class="film-name">${film.title}</h3>
                    <p>
                        <span class="film-info">
                            <span class="film-genres">${genresByNames}</span> ${film.year}
                        </span>
                        <span class="film-raiting">${film.vote_average}</span>
                    </p>
                </li>`;
    })
    .join(' ');
  const filmCards = document.querySelector('.films');
  filmCards.innerHTML = markup;
  for (let arrID = 0; arrID < data.films.length; arrID += 1) {
    filmCards.children[arrID].addEventListener('click', modal);
  }
  return data;
}
