import View from './view';
import previewView from './previewView';
// import icon from '../../img/icons.svg'
class viewResult extends View {
  _parentEl = document.querySelector('.results');
  // _errorMessage = 'No recipe found';

  _generateMarkup() {
    console.log(this._data)
    return this._data.map(result => previewView.rendering(result, false)).join('');
  }
}
export default new viewResult();
