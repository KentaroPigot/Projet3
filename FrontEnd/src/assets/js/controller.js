import * as model from './model.js';
import worksView from './views/worksView.js';
import adminView from './views/adminView.js';
import loginView from './views/loginView.js';
import Modal1 from './views/modal1View.js';
import Modal2 from './views/modal2View.js';
import { checkEmail, checkPassword, getCategories } from './helper.js';

console.log(`isAdmin = ${model.state.isAdmin}`);

const controlWorks = async function () {
  try {
    // Loading Works
    await model.loadWorks();
    // Rendering Works
    worksView.render(model.state.works);
    if (model.state.isAdmin) {
      adminView.renderAdminOptions();
      controlAdmin();
    }
  } catch (err) {
    console.error(err);
  }
};

const controlFilters = async function () {
  if (model.state.isAdmin) return;
  this.preventDefault();
  try {
    //Filters rendering
    const res = await getCategories();
    worksView.activeFilter();
    worksView.renderFilters(res);

    //Filters fonctionnality
    worksView.filters.addEventListener('click', async function (e) {
      if (!e.target.classList.contains('filter')) return;
      console.log(e.target.dataset.id);
      const id = +e.target.dataset.id;
      if (!id) return controlWorks();
      await model.loadWorksByCateg(id);

      worksView.render(model.state.works);
    });
  } catch (err) {
    console.error(err);
  }
};

const controlLogin = async function () {
  try {
    this.preventDefault();
    const email = loginView.emailInput;
    const password = loginView.passwordInput;
    loginView.wrongLoginFormatRender(
      checkEmail(email),
      checkPassword(password)
    );
    if (checkEmail(email) && checkPassword(password)) {
      console.log('Admin mode !');
      await model.checkLoginData(email.value, password.value);
      location.href = 'index.html';
    }
  } catch (err) {
    loginView.wrongLoginRender();
    console.error(err);
  }
};

export const controlModal1 = async function () {
  await model.loadModal1();
  Modal1.render(model.state.works);
  Modal1.addDeleteFunctionnality();
  Modal1.overlay.addEventListener('click', e => Modal1.closeModal1(e));
};

const controlModal2 = async function () {
  model.loadModal2();
  Modal2.renderDownloadFile();
  Modal2.modal2Form.addEventListener('submit', e => {
    e.preventDefault();
    e.stopPropagation();
  });

  Modal2.sendWorkBtn.addEventListener('submit', e => {
    e.preventDefault();
  });

  Modal2.sendWorkBtn.addEventListener('click', async e => {
    e.preventDefault();
    e.stopPropagation();
    const addingWork = await model.addWork(
      Modal2.addPicBtn.files[0],
      Modal2.addTitleInput.value,
      Modal2.categorieInput.value
    );
    if (!addingWork) return;
    await model.loadWorks();
    Modal2.closeModal2();
    worksView.render(model.state.works);
    Modal1.render(model.state.works);
    Modal1.addDeleteFunctionnality();
    Modal2.cleanInputs();
    Modal2.popupOn();
    setTimeout(Modal2.popupOff.bind(Modal2), 5000);
  });
};

const controlAdmin = function () {
  adminView.renderAdminOptions();
  controlModal1();
  controlModal2();
};

// EVENT LISTENERS
if (window.location.pathname == '/FrontEnd/index.html') {
  window.addEventListener('load', controlWorks);
  window.addEventListener('load', function (e) {
    controlFilters.bind(e).call();
  });
}

loginView?.loginBtn?.addEventListener('click', function (e) {
  controlLogin.bind(e).call();
}) ?? null;
