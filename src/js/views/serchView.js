  class searchView {
    _parenEL = document.querySelector('.search')

    getQuery(){
     return   this._parenEL.querySelector('.search__field').value;
    }

    handleSearchResult( handler){
 this._parenEL.addEventListener('submit', (e)=>{
  e.preventDefault()
 handler()
 this._clearSearchBox()
        })
    }

    _clearSearchBox(){
     this._parenEL.querySelector('.search__field').value = ''
    }
}

export default new searchView()