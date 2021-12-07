import filmsAPIService from './api-service';
import render from './rendering';

export default function popularFilms() {
  const trendingFilms = new filmsAPIService();
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
}
