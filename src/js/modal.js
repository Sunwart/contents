import renderModal from './renred-modal';
import { allFilms } from '../index';

const closeModal = document.querySelector('[data-modal-close]');
const modalka = document.querySelector('[data-modal]');
closeModal.addEventListener('click', toggleModal);

export default function modal(event) {
  const id = event.currentTarget.getAttribute('data-modal-open');

  const openModal = document.querySelector(`[data-modal-open="${id}"]`);

  allFilms.getSingleFilmByID(id).then(renderModal);
  toggleModal();
}

function toggleModal() {
  modalka.classList.toggle('is-hidden');
  document.querySelector('.films').classList.toggle('modal-open');
}
