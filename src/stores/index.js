import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'
//
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    books: [],
  },
  getters: {
    get: state => {
      return state.books
    },
    /**
     * books内のidを検索して、id値が一致するものが存在すれば取得し、なければapiを叩いて取得する
     *
     * @param state
     * @return {function(*): *}
     */
    find: state => id => {
      return state.books.filter(elm => {
        return elm.id === id
      })
    },
  },
  mutations: {
    /**
     *
     * ローカルストレージに保存する
     *
     * @param state
     * @param books
     */
    update(state, books) {
      state.books.push(books)
    },
  },
  // actions: {
  //   setBooks({ commit }, id) {},
  //   getBooks({ commit, dispatch }) {
  //     const ENDPOINT = 'https://www.googleapis.com/books/v1/volumes'
  //     const CONFIG = {
  //       params: {
  //         q: 'Vuejs',
  //       },
  //     }
  //     if (dispatch('existLocalStorage')) {
  //       commit
  //     }
  //     this.getter.get()
  //   },
  //   getLocalStorage() {
  //     return JSON.parse(localStorage.getItem('books'))
  //   },
  //   setLocalStorage(books) {
  //     const latest = []
  //     latest.push(JSON.parse(localStorage.getItem('books')))
  //     latest.push(books)
  //     localStorage.setItem('books', JSON.stringify(latest))
  //   },
  //   existLocalStorage({ dispatch }) {
  //     return dispatch('getLocalStorage').length
  //   },
  // },
})
