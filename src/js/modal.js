import renderModal from './renred-modal';
import { allFilms } from '../index';

export default function modal(event) {
  const closeModal = document.querySelector('[data-modal-close]');
  closeModal.addEventListener('click', toggleModal);

  const id = event.currentTarget.getAttribute('data-modal-open');

  const openModal = document.querySelector(`[data-modal-open="${id}"]`);

  allFilms.getSingleFilmByID(id).then(renderModal);
  toggleModal();

  document.addEventListener('keyup', onPressEsc);

  const bg = document.querySelector('.modal-bg');
  bg.addEventListener('click', onBgClick);
}

function toggleModal() {
  document.querySelector('[data-modal]').classList.toggle('is-hidden');
}

function onPressEsc(event) {
  if (event.key === 'Escape') {
    document.removeEventListener('keyup', onPressEsc);
    toggleModal();
  }
}

function onBgClick(event) {
  if (event.currentTarget === event.target) {
    toggleModal();
  }
}
