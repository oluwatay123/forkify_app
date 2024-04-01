import View from './view';

class addRecipeView extends View {
  _parentEl = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window')
  _overlay = document.querySelector('.overlay')
  _openbtn = document.querySelector('.nav__btn--add-recipe')
  _closeBtn = document.querySelector('.btn--close-modal')
  //  _message = '';
  constructor(){
    super();
    this._showWindowModal()
    this._hideWindowModal()
  }
_toggleWindow(){
    this._overlay.classList.toggle('hidden')
    this._window.classList.toggle('hidden')
}
_showWindowModal(){
    this._openbtn.addEventListener('click',this._toggleWindow.bind(this))
}

_hideWindowModal(){
    this._closeBtn.addEventListener('click',this._toggleWindow.bind(this))
    this._overlay.addEventListener('click',this._toggleWindow.bind(this))
}

addHandlerAddNewRecipe(handler){
this._parentEl.addEventListener('submit', function(e){
    e.preventDefault()
    const dataArr =  new FormData(this)
    const data = Object.fromEntries(dataArr)
    handler(data);
    
})
}

  _generateMarkup() {}
}
export default new addRecipeView();
