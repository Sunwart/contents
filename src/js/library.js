import { allFilms } from '../index';
import modal from './modal';

export default function libraryFilms() {
  document.querySelector('.films').innerHTML = '';
  allFilms.FilmIDs = [];
  allFilms.libPage = true;

  if (!document.querySelector('.watched').disabled) {
    try {
      const watched = JSON.parse(localStorage.getItem('watched'));
      allFilms.filmsNumber += watched.ids.length;
      allFilms.FilmIDs.push(...watched.ids);
    } catch (error) {}
  }

  if (!document.querySelector('.queue').disabled) {
    try {
      const queue = JSON.parse(localStorage.getItem('queue'));
      allFilms.filmsNumber += queue.ids.length;
      allFilms.FilmIDs.push(...queue.ids);
    } catch (error) {}
  }

  let arr = allFilms.FilmIDs;
  arr = arr
    .reverse()
    .filter(function (e, i, arr) {
      return arr.indexOf(e, i + 1) === -1;
    })
    .reverse();
  allFilms.FilmIDs = arr;
  allFilms.filmsNumber = arr.length;

  if (allFilms.filmsNumber === 0) {
    allFilms.allPages = 1;
    return;
  } else {
    if (allFilms.filmsNumber % 20 === 0) {
      allFilms.allPages = Number.parseInt(allFilms.filmsNumber / 20);
    } else {
      allFilms.allPages = Number.parseInt(allFilms.filmsNumber / 20) + 1;
    }
  }
  document.querySelector('.pages-number').innerHTML = 'of ' + allFilms.allPages;

  renderLibrary();
}

function renderLibrary() {
  let elementsOnPage;
  if (allFilms.currentPage < allFilms.allPages) {
    elementsOnPage = 20;
  } else {
    if (allFilms.filmsNumber % 20 === 0) {
      elementsOnPage = 20;
    } else {
      elementsOnPage = allFilms.filmsNumber % 20;
    }
  }

  const startingElement = allFilms.currentPage * 20 - 20;
  for (let i = 0; i < elementsOnPage; i += 1) {
    allFilms.getSingleFilmByID(allFilms.FilmIDs[startingElement + i]).then(renderFilmCard);
  }
}

function renderFilmCard(res) {
  //genres
  const genres = res.data.genres.map(el => el.name).join(', ');

  // poster
  let poster_url;
  if (!res.data.poster_path) {
    poster_url =
      'https://image.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg';
  } else {
    poster_url = `https://www.themoviedb.org/t/p/w500/${res.data.poster_path}`;
  }

  //year
  if (!res.data.release_date) {
    res.data.year = '';
  } else {
    res.data.release_date = res.data.release_date.slice(0, 4);
    res.data.year = `|<span class="film-year">${res.data.release_date}</span>`;
  }

  //film id
  const id = `data-modal-open="${res.data.id}"`;
  const markup = `<li class="film-card" ${id}>
                    <img src="${poster_url}"
                        alt="${res.data.title} - movie poster"
                        class="film-card-img"/>
                    <h3 class="film-name">${res.data.title}</h3>
                    <p>
                        <span class="film-info">
                            <span class="film-genres">${genres}</span> ${res.data.release_date}
                        </span>
                        <span class="film-raiting">${res.data.vote_average}</span>
                    </p>
                </li>`;

  document.querySelector('.films').insertAdjacentHTML('beforeend', markup);

  document.querySelector(`[${id}]`).addEventListener('click', modal);
}
