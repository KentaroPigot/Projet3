// export const MODUL1 = {
//   modal1: document.querySelector('#modal1'),
//   deleteAllGallery: modal1.querySelector('.delete-gallery'),
//   closeModal: document.querySelectorAll('.close-btn'),
//   imgContainer: document.querySelector('.img-container'),
//   addPicModal1: modal1.querySelector('#ajouterPhoto'),
// };

export class MODUL1 {
  modal1 = document.querySelector('#modal1');
  deleteAllGallery = modal1.querySelector('.delete-gallery');
  closeModal = document.querySelectorAll('.close-btn');
  imgContainer = document.querySelector('.img-container');
  addPicModal1 = modal1.querySelector('#ajouterPhoto');
}

export class MODUL2 {
  modal2 = document.querySelector('#modal2');
  backBtn = document.querySelector('.back-btn');
  addPicBtn = modal2.querySelector('#add-pic-btn');
  addPicBtnLabel = modal2.querySelector('.add-pic-btn');
  addTitle = modal2.querySelector('#title');
  addPicWrapper = modal2.querySelector('.add-pic-wrapper');
  addPicText = addPicWrapper.querySelector('p');
  imagePlaceholder = modal2.querySelector('#img-placeholder');
  sendWorkBtn = modal2.querySelector('#valider');
  imgExemple = modal2.querySelector('.img-exemple');
  categorie = modal2.querySelector('#categories');
}

// const nameForm = document.querySelector('#name');
// const emailForm = document.querySelector('#email');
// const messageForm = document.querySelector('#message');
// const btnForm = document.querySelector('#contact-form');

const adminElms = document.querySelectorAll('.admin');
const openModal1 = document.querySelectorAll('.modifier');

const overlay = document.querySelector('.overlay');
