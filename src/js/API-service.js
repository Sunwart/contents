import axios from 'axios';

export default class filmsAPIService {
  constructor() {
    this.currentPage = 1; // можна використовувати для пагінації
    this.lang = 'uk';
    this.genres = [{ id: 0, name: 'uncategorized' }];
  }

  getTrendingFilms() {
    return axios.get(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=daf1fe8995a61d2fecc007eaa464ca98&page=${this.currentPage}&language=${this.lang}`,
    );
  }

  getFilmsByQuery(query) {
    return axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=daf1fe8995a61d2fecc007eaa464ca98&query=${query}&page=${this.currentPage}&include_adult=false&language=${this.lang}`,
    );
  }

  getSingleFilmByID(filmID) {
    return axios.get(
      `https://api.themoviedb.org/3/movie/${filmID}?api_key=daf1fe8995a61d2fecc007eaa464ca98&language=${this.lang}`,
    );
  }

  async getGenres() {
    const genres = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=daf1fe8995a61d2fecc007eaa464ca98&language=${this.lang}`,
    );
    this.genres.push(...genres.data.genres);
  }

  get allGenres() {
    return this.genres;
  }

  get page() {
    return this.currentPage;
  }

  set page(pageNumber) {
    this.currentPage = pageNumber;
  }

  get language() {
    return this.lang;
  }

  set language(userLang) {
    this.lang = userLang;
  }
}

// const API_KEY = 'daf1fe8995a61d2fecc007eaa464ca98';
// const query = 'dog';
// const filmID = 580489;
// const language = 'ua';

// axios
//   .get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=${language}`)
//   .then(res => {
//     console.log('+++++++++++++++++ ВСІ ЖАНРИ');
//     console.log(res.data.genres);
//   });
// axios
//   .get(
//     `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&page=5&language=${language}`,
//   )
//   .then(res => {
//     console.log('************** ПОПУЛЯРНІ ФІЛЬМИ');

//     console.log('сторінка пагінації - ', res.data.page);
//     console.log('перший фільм сторінки - ', res.data.results[0]);
//     console.log('ай-ді першого фільму - ', res.data.results[0].id);
//     console.log('локалізована назва - ', res.data.results[0].title);
//     console.log('назва мовою оригіналу - ', res.data.results[0].original_title);
//     console.log('айдішники жанрів - ', res.data.results[0].genre_ids);
//     console.log('рейтинг фільму - ', res.data.results[0].vote_average);
//     console.log('дата релізу - ', res.data.results[0].release_date.slice(0, 4));
//     console.log(
//       'лінк на постер',
//       `https://www.themoviedb.org/t/p/w500/${res.data.results[3].poster_path}`,
//     );
//   });

// axios
//   .get(`https://api.themoviedb.org/3/movie/${filmID}?api_key=${API_KEY}&language=${language}`)
//   .then(res => {
//     console.log('************** ФІЛЬМ ПО ID');
//     console.log(res.data);
//     console.log('локалізована назва - ', res.data.title);
//     console.log('назва мовою оригіналу - ', res.data.original_title);
//     console.log('жанри - ', ...res.data.genres);
//     console.log('рейтинг фільму - ', res.data.vote_average);
//     console.log('проголосувало - ', res.data.vote_count);
//     console.log('дата релізу - ', res.data.release_date.slice(0, 4));
//     console.log('опис - ', res.data.overview);

//     console.log('лінк на постер', `https://www.themoviedb.org/t/p/w500/${res.data.poster_path}`);
//   });

// axios
//   .get(
//     `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&page=1&include_adult=false&language=${language}`,
//   )
//   .then(res => {
//     console.log('************** ФІЛЬМИ ЗА ПОШУКОВИМ ЗАПИТОМ');
//     console.log('всього знайдено сторінок - ', res.data.total_pages);
//     console.log('всього знайдено фільмів', res.data.total_results);
//     console.log('сторінка пагінації - ', res.data.page);
//     console.log('перший фільм сторінки - ', res.data.results[0]);
//     console.log('ай-ді першого фільму - ', res.data.results[0].id);
//     console.log('локалізована назва - ', res.data.results[0].title);
//     console.log('назва мовою оригіналу - ', res.data.results[0].original_title);
//     console.log('айдішники жанрів - ', res.data.results[0].genre_ids);
//     console.log('рейтинг фільму - ', res.data.results[0].vote_average);
//     console.log('дата релізу - ', res.data.results[0].release_date.slice(0, 4));
//     console.log(
//       'лінк на постер',
//       `https://www.themoviedb.org/t/p/w500/${res.data.results[0].poster_path}`,
//     );
//   })
//   .catch(error => console.log('ПОМИЛКА'));
