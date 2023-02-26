// import { WorksView } from './WorksView';
import { deleteWork } from '../model.js';

class Modal1 {
  #parentEl = document.querySelector('.img-container');

  modal1 = document.querySelector('#modal1');
  closeModalBtn = document.querySelectorAll('.close-btn1');
  openModal1Btns = document.querySelectorAll('.modifier');
  deleteBtns;
  deleteAllWorksBtn = document.querySelector('.delete-gallery');

  openModal2Btn = document.querySelector('#ajouterPhoto');
  modal2 = document.querySelector('#modal2');

  overlay = document.querySelector('.overlay');
  #data;

  deleteAllHandler(handler) {
    this.deleteAllWorksBtn.addEventListener('click', () => {
      handler(null, Array.from(this.deleteBtns));
    });
  }

  render(data) {
    this.#data = data;
    this.#clean();
    const markup = this.#data.map(prj => this.#generateMarkup(prj)).join('');
    this.#parentEl.insertAdjacentHTML('afterbegin', markup);

    //render Delete Buttons
    this.#parentEl
      .querySelectorAll('figure')
      .forEach(fig => this.createDeleteBtns(fig));
    this.deleteBtns = document.querySelectorAll('.delete');
  }

  #clean() {
    this.#parentEl.innerHTML = '';
  }

  #generateMarkup(projet) {
    return `<figure>
    <img src="${projet.imageUrl}" data-id="${projet.id}" crossorigin="anonymous"/><figcaption>éditer</figcaption>
    </figure>`;
  }

  createDeleteBtns(parent) {
    const markup = `<i class="fa-solid fa-trash-can"></i>`;
    const deleteBtn = document.createElement('div');
    deleteBtn.classList.add('delete');
    deleteBtn.insertAdjacentHTML('afterbegin', markup);
    parent.append(deleteBtn);
  }

  addDeleteFunctionnality() {
    this.deleteBtns.forEach(btn =>
      btn.addEventListener('click', e => {
        e.preventDefault();
        deleteWork(e, btn);
      })
    );
  }

  openModal1() {
    this.modal1.classList.remove('hidden');
    this.overlay.classList.remove('hidden');
  }
  closeModal1() {
    this.modal1.classList.add('hidden');
    this.overlay.classList.add('hidden');
  }

  openModal2(e) {
    e.preventDefault();
    this.modal1.classList.add('hidden');
    this.modal2.classList.remove('hidden');
  }
}

export default new Modal1();

//Il faut extends la classe pour récupérer la function render de worksView et l'utiliser avec le parentEl et le #generateMarkup d'ici
