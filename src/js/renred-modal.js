export default function renderModal(res) {
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

  const markup = `<img src="${poster_url}" data-id="${res.data.id}" alt="${res.data.title} - movie poster" class="film-info__img" "/>
      <div>
        <h2 class="movie-title">${res.data.title}</h2>
        <ul class="film-info__details--container">
          <li class="film-info__details--elem">
            <span class="film-info__details">Raiting</span
            ><span class="details__value film-raiting">${res.data.vote_average}</span>
          </li>
          <li class="film-info__details--elem">
            <span class="film-info__details">Votes</span><span class="details__value">${res.data.vote_count}</span>
          </li>
          <li class="film-info__details--elem">
            <span class="film-info__details">Popularity</span
            ><span class="details__value">${res.data.popularity}</span>
          </li>
          <li class="film-info__details--elem">
            <span class="film-info__details">Genre</span
            ><span class="details__value">${genres}</span>
          </li>
        </ul>
        <h3 class="subtitle">About</h3>
        <p class="film-description">
          ${res.data.overview}
        </p>
        <ul class="buttons-container">
          <li><button type="button" class="film-button">Add to watched</button></li>
          <li><button type="button" class="film-button" disabled>Add to queue</button></li>
        </ul> `;
  document.querySelector('.film-info--align').innerHTML = markup;
}
