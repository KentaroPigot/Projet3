class WorksView {
  #parentEl = document.querySelector('.gallery');
  #data;
  filters = document.querySelector('.filters');

  render(data) {
    console.log('renderingWorksView');
    this.#data = data;
    this.#clean();
    const markup = this.#data.map(prj => this.#generateMarkup(prj)).join('');
    this.#parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  renderFilters(categories) {
    console.log('rendering');
    const markup = categories.map(cat => this.#generateFilters(cat)).join('');
    this.filters.insertAdjacentHTML('beforeend', markup);
  }

  #clean() {
    this.#parentEl.innerHTML = '';
  }

  #generateMarkup(prj) {
    return `<figure>
        <img src="${prj.imageUrl}" crossorigin="anonymous" /><figcaption>${prj.title}</figcaption>
        </figure>`;
  }

  #generateFilters(category) {
    return `<button class="filter ${category.name}" data-id="${category.id}">${category.name}</button>`;
  }
}

export default new WorksView();
