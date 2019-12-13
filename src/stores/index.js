import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    books: null,
    startIndex: 0,
    totalItems: 0,
  },
  getters: {
    getBooks: state => {
      return state.books
    },
    getStartIndex(state) {
      return state.startIndex
    },
    getTotalItems(state) {
      return state.totalItems
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
    updateBooks(state, books) {
      if (state.books) {
        books.forEach(book => {
          state.books.push(book)
        })
      } else {
        this.state.books = books
      }
    },
    updateStartIndex(state) {
      if (this.getters.getBooks) {
        state.startIndex = this.getters.getBooks.length
      }
    },
    updateTotalItems(state, totalItems) {
      if (this.getters.getBooks) {
        state.totalItems = totalItems
      }
    },
  },
  actions: {
    setBooks({ commit }, books) {
      commit('update', books)
    },
    // getBooks({ commit, dispatch }, query) {
    getBooks({ commit }, query) {
      // if (dispatch('existLocalStorage')) {
      //   commit
      // }
      console.log(this.getters.count)
      const ENDPOINT = 'https://www.googleapis.com/books/v1/volumes'
      const CONFIG = {
        params: {
          q: query,
          startIndex: this.getters.getStartIndex,
        },
      }
      axios.get(ENDPOINT, CONFIG).then(res => {
        if (res.data) {
          console.log(res.data)
          commit('updateBooks', res.data.items)
          commit('updateStartIndex')
          commit('updateTotalItems', res.data.totalItems)
        }
      })
      // dispatch('setBooks', books)
    },
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
  },
})
