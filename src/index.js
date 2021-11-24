import './sass/main.scss';

const allContent = document.querySelector('#all');
const filteredContent = document.querySelector('#filtered');

const allBtn = document.querySelector('button[data-all]');
const compendiumBtn = document.querySelector('button[data-compendium]');
const videoBtn = document.querySelector('button[data-video]');
const otherResourcesBtn = document.querySelector('button[data-others]');

allBtn.addEventListener('click', showAll);

compendiumBtn.addEventListener('click', () => {
  filter('compendium');
  disableBtn(compendiumBtn);
});
videoBtn.addEventListener('click', () => {
  filter('video');
  disableBtn(videoBtn);
});
otherResourcesBtn.addEventListener('click', () => {
  filter('resources');
  disableBtn(otherResourcesBtn);
});

function filter(filterName) {
  hideAll();
  const array = document.querySelectorAll(`.${filterName}`);
  let markup = '';
  array.forEach(el => {
    markup = markup + `<li class="${filterName}">` + el.innerHTML + '</li>';
  });
  filteredContent.innerHTML = markup;
}

function hideAll() {
  allContent.classList.add('is-hidden');
  activateBtn(allBtn);
}

function showAll() {
  allContent.classList.remove('is-hidden');
  filteredContent.innerHTML = '';
  disableBtn(allBtn);
}

function disableBtn(btn) {
  activateBtn(compendiumBtn);
  activateBtn(videoBtn);
  activateBtn(otherResourcesBtn);
  activateBtn(allBtn);
  btn.disabled = true;
}

function activateBtn(btn) {
  btn.disabled = false;
}
