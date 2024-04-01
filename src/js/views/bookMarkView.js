import View from './view';
import previewView from './previewView';
class viewResult extends View {
  _parentEl = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmark found';

  addHandlerRender(handler){
    window.addEventListener('load', handler)
  }
  _generateMarkup() {
    console.log(this._data)
    return this._data
      .map(bookmark => previewView.rendering(bookmark, false))
      .join('');
  }
}
export default new viewResult();
