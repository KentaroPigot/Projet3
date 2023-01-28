import {
  getData,
  getCategories,
  checkEmail,
  checkPassword,
  checkIfFormValid,
} from './helper.js';
import Modal1 from './views/modal1View.js';
import Modal2 from './views/modal2View.js';
import WorksView from './views/WorksView.js';

export const state = {
  works: {},
  token: localStorage.getItem('Token'),
  get isAdmin() {
    return !!state.token;
  },
};

export const loadWorks = async function () {
  try {
    const data = await getData();
    state.works = data;
  } catch (err) {
    console.log(`${err}`);
  }
};

export const loadWorksByCateg = async function (id) {
  try {
    const categories = await getCategories();
    const category = categories.find(el => el.id === id);

    const data = await getData();
    const filteredData = data.filter(el => el.categoryId == category.id);

    state.works = filteredData;
  } catch (err) {
    console.log(`${err}`);
  }
};

export const checkLoginData = async function (email, password) {
  try {
    const a = email;
    const b = password;

    const response = await fetch('http://localhost:5678/api/users/login', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: a,
        password: b,
      }),
    });
    const content = await response.json();

    if (!response.ok)
      throw new Error(`${content.message} (${response.status})`);
    localStorage.setItem('Token', content.token);
  } catch (err) {
    throw err;
  }
};

export const loadModal1 = async function () {
  try {
    Modal1.openModal1Btns.forEach(el =>
      el.addEventListener('click', () => {
        Modal1.openModal1();
      })
    );
    Modal1.closeModalBtn.forEach(el =>
      el.addEventListener('click', () => {
        Modal1.closeModal1();
      })
    );
    const data = await getData();
    state.works = data;
  } catch (err) {}

  //generate modal1 (model.function())
  //fetch images
  //addEventListeners sur les boutons modifier
};

export const deleteWork = async function (e, element) {
  try {
    console.log(e);
    console.log(element);
    e.preventDefault();
    // getting img that has data-id
    const elm = element.closest('figure').querySelector('img');
    const deleteWork = await fetch(
      `http://localhost:5678/api/works/${elm.dataset.id}`,
      {
        method: 'DELETE',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('Token')}`,
        },
        body: null,
      }
    );

    if (!deleteWork.ok)
      throw new Error(`Unable to delete work ${elm.dataset.id}`);

    console.log(`${elm.dataset.id} Deleted !`);
    await loadWorks();
    console.log(state.works);
    WorksView.render();
    Modal1.render();
  } catch (err) {
    console.log(err);
  }
};

export const loadModal2 = async function () {
  try {
    //Add Event Listeners
    Modal1.openModal2Btn.addEventListener('click', e => Modal1.openModal2(e));
    Modal2.overlay.addEventListener('click', e => Modal2.closeModal2(e));
    Modal2.modal2BackBtn.addEventListener('click', () =>
      Modal2.goBackToModal1()
    );
    Modal2.modal2CloseBtn.addEventListener('click', () => Modal2.closeModal2());
  } catch (err) {
    console.log(err);
  }
};

export const addWork = async function (files, title, categ) {
  try {
    console.log('addWork');
    // Il faut créer une verification des inputs avant d'envoyer le formulaire
    if (!checkIfFormValid(files, title, categ))
      throw new Error('Form non valid');

    console.log('coool');
    const formData = new FormData();
    formData.append('image', files);
    formData.append('title', title);
    formData.append('category', categ);

    const res = await fetch('http://localhost:5678/api/works', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('Token')}`,
      },
      body: formData,
    });
    console.log(res);
    // return false;
  } catch (err) {
    console.log(err);
  }
};

export const adminMode = function () {};
