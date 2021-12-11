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

  //buttons
  let watchedClasses = '';
  let addBtnText = '';
  if (checkWatched(res.data.id)) {
    watchedClasses = 'film-button added';
    addBtnText = 'Remove from watched';
  } else {
    watchedClasses = 'film-button';
    addBtnText = 'Add to watched';
  }

  let queueClasses = '';
  let queueBtnText = '';
  if (checkQueue(res.data.id)) {
    queueClasses = 'film-button added';
    queueBtnText = 'Remove from queue';
  } else {
    queueClasses = 'film-button';
    queueBtnText = 'Add to queue';
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
          <li><button type="button" class="watched-btn ${watchedClasses}">${addBtnText}</button></li>
          <li><button type="button" class="queue-btn ${queueClasses}">${queueBtnText}</button></li>
        </ul> `;
  document.querySelector('.film-info--align').innerHTML = markup;
  document.querySelector('.watched-btn').addEventListener('click', onWatchedBtnClick);
  document.querySelector('.queue-btn').addEventListener('click', onQueueBtnClick);
}

function checkWatched(filmId) {
  try {
    const currentWatched = JSON.parse(localStorage.getItem('watched'));
    return currentWatched.ids.includes(filmId);
  } catch (error) {
    return false;
  }
}

function checkQueue(filmId) {
  try {
    const currentQueue = JSON.parse(localStorage.getItem('queue'));
    return currentQueue.ids.includes(filmId);
  } catch (error) {
    return false;
  }
}

function onWatchedBtnClick(event) {
  const filmID = Number(document.querySelector('.film-info__img').getAttribute('data-id'));

  if (event.target.classList.contains('added')) {
    event.target.classList.remove('added');
    event.target.innerHTML = 'Add to watched';
    try {
      const currentWatched = JSON.parse(localStorage.getItem('watched'));
      currentWatched.ids.splice(currentWatched.ids.indexOf(filmID), 1);
      localStorage.setItem('watched', JSON.stringify(currentWatched));
    } catch (error) {
      return;
    }
  } else {
    event.target.classList.add('added');
    event.target.innerHTML = 'Remove from watched';
    const watched = { ids: [] };
    try {
      const currentWatched = JSON.parse(localStorage.getItem('watched'));
      currentWatched.ids.push(filmID);
      watched.ids.push(...currentWatched.ids);
    } catch (error) {
      watched.ids.push(filmID);
    }
    localStorage.setItem('watched', JSON.stringify(watched));
  }
}

function onQueueBtnClick(event) {
  const filmID = Number(document.querySelector('.film-info__img').getAttribute('data-id'));

  if (event.target.classList.contains('added')) {
    event.target.classList.remove('added');
    event.target.innerHTML = 'Add to queue';
    try {
      const currentQueue = JSON.parse(localStorage.getItem('queue'));
      currentQueue.ids.splice(currentQueue.ids.indexOf(filmID), 1);
      localStorage.setItem('queue', JSON.stringify(currentQueue));
    } catch (error) {
      return;
    }
  } else {
    event.target.classList.add('added');
    event.target.innerHTML = 'Remove from queue';
    const queue = { ids: [] };
    try {
      const currentQueue = JSON.parse(localStorage.getItem('queue'));
      currentQueue.ids.push(filmID);
      queue.ids.push(...currentQueue.ids);
    } catch (error) {
      queue.ids.push(filmID);
    }
    localStorage.setItem('queue', JSON.stringify(queue));
  }
}
