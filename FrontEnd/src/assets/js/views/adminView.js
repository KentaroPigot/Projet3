class adminView {
  #adminElements = document.querySelectorAll('.admin');
  filters = document.querySelector('.filters');
  renderAdminOptions() {
    this.#adminElements.forEach(el => (el.style.display = 'flex'));
  }
}

export default new adminView();
