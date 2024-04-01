import icon from '../../img/icons.svg';

export default class View {
  _data;
  _errorMessage = '';
  // _message = '';
  rendering(data, rendering = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    if(!rendering) return markup
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

 
  // to clear the page
  _clear() {
    this._parentEl.innerHTML = ''; 
  }

  showSpinner = parentEl => {
    const markup = `
           <div class="spinner">
          <svg>
            <use href="${icon}svg#icon-loader"></use>
          </svg>
        </div> 
          
          `;
    this._clear();
    this._parentEl.insertAdjacentHTML('beforeend', markup);
  };

  renderError(mesage = this._errorMessage) {
    const markup = ` <div class="error">
      <div>
        <svg>
          <use href="${icon}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${mesage}</p>
    </div>`;
    this._clear();
    this._parentEl.insertAdjacentHTML('beforeend', markup);
  }
 
  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElement = Array.from(newDom.querySelectorAll('*'));

    const curElments = Array.from(this._parentEl.querySelectorAll('*'));
    // to compare the original dom content and the updated one
    newElement.forEach((newEL, i) => {
      const curEl = curElments[i];

      if (
        !newEL.isEqualNode(curEl) &&
        newEL.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEL.textContent;
      }

      if (!newEL.isEqualNode(curEl)) {
        Array.from(newEL.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  renderMessage(mesage = this._message) {
    const markup = ` <div class="error">
      <div>
        <svg>
          <use href="${icon}#icon-smile"></use>
        </svg>
      </div>
      <p>${mesage}</p>
    </div>`;
    this._clear();
    this._parentEl.insertAdjacentHTML('beforeend', markup);
  }
}
