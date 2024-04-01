import View from './view';
import icon from '../../img/icons.svg';
class paginationView extends View {
  _parentEl = document.querySelector('.pagination');

  handleCLickEvents(handler) {
    this._parentEl.addEventListener('click', function (e) {
      
       
      const btn = e.target.closest('.btn--inline');
      const Goto = +btn.dataset.goto
      if(!btn) return
      console.log(btn);
    
      handler(Goto);
    });
  }

  _generateMarkup() {
    const currpage = this._data.page;
    const numpage = Math.ceil(
      this._data.Result.length / this._data.resultPerPage
    );
    console.log(numpage);

    //if its page one and other pages
    if (currpage === 1 && numpage > 1) {
      return `
      <button   data-goto="${currpage + 1}" class="btn--inline pagination__btn--next">
      <span>page${currpage + 1}</span>
      <svg class="search__icon">
        <use href="${icon}#icon-arrow-right"></use>
      </svg>
    </button>

     `;
    }

    // if it s page 1 and no other pages
    if (currpage === numpage && numpage > 1) {
      return `
      <button data-goto="${currpage - 1}" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="page${icon}#icon-arrow-left"></use>
      </svg>
      <span>${currpage - 1}</span>
    </button>
      `;
    }

    // if its other   pages
    if (currpage < numpage) {
      return `
      <button  data-goto="${currpage - 1}" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icon}#icon-arrow-left"></use>
      </svg>
      <span>page${currpage - 1}</span>
    </button>
    <button   data-goto="${currpage + 1}" class="btn--inline pagination__btn--next">
    <span>page${currpage + 1}</span>
    <svg class="search__icon">
      <use href="${icon}#icon-arrow-right"></use>
    </svg>
  </button>
      `;
    }

    // if  its just one page
    return '';
  }
}

export default new paginationView();
