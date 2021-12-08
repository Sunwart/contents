import axios from 'axios';

export default class filmsAPIService {
  constructor() {
    this.currentPage = 1;
    this.lang = 'en';
    this.allGenres = [{ id: 0, name: 'uncategorized' }];
    this.allPages = 1000;
    this.searchQuery = '';
  }

  getTrendingFilms() {
    return axios.get(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=daf1fe8995a61d2fecc007eaa464ca98&page=${this.currentPage}&language=${this.lang}`,
    );
  }

  getFilmsByQuery() {
    return axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=daf1fe8995a61d2fecc007eaa464ca98&query=${this.searchQuery}&page=${this.currentPage}&include_adult=false&language=${this.lang}`,
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
    this.allGenres.push(...genres.data.genres);
  }
}
