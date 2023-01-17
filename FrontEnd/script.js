"use strict";

let admin = 0;
const filters = document.querySelector(".filters");
const gallery = document.querySelector(".gallery");

const nameForm = document.querySelector("#name");
const emailForm = document.querySelector("#email");
const messageForm = document.querySelector("#message");
const btnForm = document.querySelector("#contact-form");

const adminElms = document.querySelectorAll(".admin");
const openModal1 = document.querySelectorAll(".modifier");

const overlay = document.querySelector(".overlay");

//Modal1
const modal1 = document.querySelector("#modal1");
const deleteAllGallery = modal1.querySelector(".delete-gallery");

const closeModal = document.querySelectorAll(".close-btn");
const imgContainer = document.querySelector(".img-container");
const addPicModal1 = modal1.querySelector("#ajouterPhoto");

//Modal2
const modal2 = document.querySelector("#modal2");
const backBtn = document.querySelector(".back-btn");
const addPicBtn = modal2.querySelector("#add-pic-btn");
const addPicBtnLabel = modal2.querySelector(".add-pic-btn");
const addTitle = modal2.querySelector("#title");
const addPicWrapper = modal2.querySelector(".add-pic-wrapper");
const addPicText = addPicWrapper.querySelector("p");
const imagePlaceholder = modal2.querySelector("#img-placeholder");
const sendWorkBtn = modal2.querySelector("#valider");
const imgExemple = modal2.querySelector(".img-exemple");
const categorie = modal2.querySelector("#categories");

let deleteBtns;

const init = function () {
  renderAllData();
  if (localStorage.getItem("Token")) {
    console.log("Let's go admin !");
    adminMode();
  }
};

const renderGallery = function (projet) {
  let html = `<figure>
  <img src="${projet.imageUrl}" crossorigin="anonymous" /><figcaption>${projet.title}</figcaption>
  </figure>`;

  if ((admin = 1)) {
    gallery.insertAdjacentHTML("beforeend", html);
    html = `<figure>
    <img src="${projet.imageUrl}" data-id="${projet.id}" crossorigin="anonymous"/><figcaption>éditer</figcaption>
    </figure>`;
    imgContainer.insertAdjacentHTML("beforeend", html);

    createDeleteBtn();
  } else {
    gallery.insertAdjacentHTML("beforeend", html);
  }
};

//On render la gallery dans un argument container. Comme ça la function renderGallery peut s'occuper du minimum nécessaire
//Si en mode admin, on render aussi la gallery dans la modale1

const getData = async function () {
  try {
    const res = await fetch("http://localhost:5678/api/works");
    const projects = await res.json();
    return projects;
  } catch (err) {
    console.log(err);
  }
};

const renderAllData = async function () {
  try {
    const projects = await getData();
    projects.forEach((projet) => renderGallery(projet));
    return projects;
  } catch (err) {
    console.log(err);
  }
};

filters.addEventListener("click", (e) => {
  e.preventDefault();

  //Rajoute la class active sur le btn
  filters
    .querySelectorAll("button")
    .forEach((btn) => btn.classList.remove("active"));
  e.target.classList.add("active");

  //On récupère le data-type du btn sur lequel on click pour l'utiliser comme argument
  filterGallery(e.target.dataset.type);
});

const filterGallery = async function (type) {
  try {
    const projetsJson = await getData();

    //récupère dans une nodelist les projets présents
    const projets = gallery.querySelectorAll("figure");

    if (type === "Tous") {
      //Supprimer tout ce qu'il y a. Puis tout afficher
      projets.forEach((projet) => projet.remove());
      projetsJson.forEach((projet) => renderGallery(projet));
    }

    //Clean la gallery
    projets.forEach((projet) => projet.remove());

    //Rajoute seulement les projets qui correspondent
    projetsJson.find((projet) => {
      if (projet.category.name === type) return renderGallery(projet);
    });
  } catch (err) {
    console.log(err);
  }
};

//Check si admin pour faire apparaître les options d'admin
const adminMode = function () {
  admin = 1;
  adminElms.forEach((elm) => {
    elm.style.display = "flex";
  });
  filters.classList.add("hidden");
};

//event listeners sur tous les boutons modifier
openModal1.forEach((btn) =>
  btn.addEventListener("click", () => {
    modal1.classList.remove("hidden");
    overlay.classList.remove("hidden");
  })
);

//A améliorer aussi/optimiser
//Event listeners pour fermer les modals en clickant sur l'overlay
overlay.addEventListener("click", (e) => {
  console.log("hop");
  if (!modal1.classList.contains("hidden")) {
    modal1.classList.add("hidden");
    overlay.classList.add("hidden");
  }
  if (!modal2.classList.contains("hidden")) {
    modal2.classList.add("hidden");
    overlay.classList.add("hidden");
  }
});

//A améliorer/optimiser
closeModal.forEach((btn) =>
  btn.addEventListener("click", () => {
    console.log("close");
    if (!modal1.classList.contains("hidden")) {
      modal1.classList.add("hidden");
      overlay.classList.add("hidden");
    }
    if (!modal2.classList.contains("hidden")) {
      modal2.classList.add("hidden");
      overlay.classList.add("hidden");
    }
  })
);

//Créé les boutons pour supprimer les projets et les fixes
const createDeleteBtn = function () {
  const html = `<i class="fa-solid fa-trash-can"></i>`;
  const deleteBtn = document.createElement("div");
  deleteBtn.classList.add("delete");
  deleteBtn.insertAdjacentHTML("afterbegin", html);
  imgContainer
    .querySelectorAll("figure")
    .forEach((fig) => fig.append(deleteBtn));
  deleteBtns = document.querySelectorAll(".delete");
  deleteBtns.forEach((btn) =>
    btn.addEventListener("click", () => {
      deleteWork(btn);
    })
  );
};

const deleteWork = function (element) {
  //Par rapport au dataset ID, il supprime avec un fetch post, le work correspondant
  // dans le server
  const elm = element.closest("figure").querySelector("img");
  fetch(`http://localhost:5678/api/works/${elm.dataset.id}`, {
    method: "DELETE",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    body: null,
  }).then(() => console.log(`${elm.dataset.id} Deleted !`));
};

deleteAllGallery.addEventListener("click", () => {
  deleteBtns.forEach((elm) => {
    console.log(elm);
    // deleteWork(elm);
  });
});

addPicModal1.addEventListener("click", (e) => {
  e.preventDefault();
  modal1.classList.add("hidden");
  modal2.classList.remove("hidden");
});

//////////////////////////////////////////////////////
// Modal 2

backBtn.addEventListener("click", () => {
  modal2.classList.toggle("hidden");
  modal1.classList.toggle("hidden");
});

const sendNewWork = function () {
  // Il faut créer une verification des inputs avant d'envoyer le formulaire
  this.preventDefault();

  const formData = new FormData();
  formData.append("title", addTitle.value);
  formData.append("category", categorie.value);
  formData.append("image", addPicBtn.files[0]);

  fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    body: formData,
  });
};

addPicBtn.addEventListener("change", () => {
  //Cache tout ce qui est dans le addPicWrapper
  const addImageContent = addPicWrapper.children;
  [...addImageContent].forEach((content) => content.classList.toggle("hidden"));

  //Affiche l'image qu'on vient de charger
  const [imgToDisplay] = addPicBtn.files;
  if (imgToDisplay) {
    imagePlaceholder.src = URL.createObjectURL(imgToDisplay);
  }
});

sendWorkBtn.addEventListener("click", function (e) {
  sendNewWork.bind(e).call();
});

document.addEventListener("DOMContentLoaded", init);
