import render from './rendering';
import { allFilms } from '../index';

export const popularFilms = function () {
  allFilms
    .getTrendingFilms()
    .then(res => {
      const data = {
        total_pages: res.data.total_pages,
        page: res.data.page,
        films: res.data.results,
      };
      return data;
    })
    .then(render);
};
