class Modal2 {
  modal2 = document.querySelector('#modal2');

  modal2Form = document.querySelector('#modal2-form');

  modal2BackBtn = document.querySelector('.back-btn');
  modal2CloseBtn = document.querySelector('.close-btn2');

  imgExemple = document.querySelector('.img-exemple');
  addPicWrapper = document.querySelector('.add-pic-wrapper');
  addPicBtnLabel = document.querySelector('.add-pic-btn');
  addPicText = document.querySelector('#imageSizeText');
  imagePlaceholder = document.querySelector('#img-placeholder');

  addPicBtn = document.querySelector('#add-pic-btn');
  addTitleInput = document.querySelector('#title');
  categorieInput = document.querySelector('#categories');
  sendWorkBtn = document.querySelector('#valider');

  modal1 = document.querySelector('#modal1');
  overlay = document.querySelector('.overlay');

  popup = document.querySelector('.work-send-popup');

  renderDownloadFile() {
    this.addPicBtn.addEventListener('change', () => {
      //Cache tout ce qui est dans le addPicWrapper
      const addImageContent = this.addPicWrapper.children;
      [...addImageContent].forEach(content =>
        content.classList.toggle('hidden')
      );

      //Affiche l'image qu'on vient de charger
      const [imgToDisplay] = this.addPicBtn.files;
      if (imgToDisplay) {
        this.imagePlaceholder.src = URL.createObjectURL(imgToDisplay);
      }
    });
  }

  emptyDownloadFile() {
    const addImageContent = this.addPicWrapper.children;
    [...addImageContent].forEach(content => content.classList.toggle('hidden'));

    this.imagePlaceholder.src = '';
  }

  cleanInputs() {
    this.emptyDownloadFile();
    this.addPicBtn.value = '';
    this.addTitleInput.value = '';
    this.categorieInput.value = 1;
  }

  popupOn() {
    this.popup.classList.toggle('hidden');
  }

  popupOff() {
    this.popup.classList.toggle('hidden');
  }

  closeModal2() {
    this.modal2.classList.add('hidden');
    this.overlay.classList.add('hidden');
  }
  goBackToModal1() {
    this.modal2.classList.add('hidden');
    this.modal1.classList.remove('hidden');
  }
}

export default new Modal2();
