import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
const BASE_ENDPOINT = 'https://www.googleapis.com/books/v1/volumes'
export default new Vuex.Store({
  state: {
    books: null,
    startIndex: 0,
    totalItems: 0,
    query: null,
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
    getQuery(state) {
      return state.query
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
    resetAll(state) {
      state.books = []
      state.startIndex = 0
      state.totalItems = 0
      state.query = null
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
    setQuery(state, query) {
      state.query = query
    },
  },
  actions: {
    setBooks({ commit }, query = null) {
      if (query) {
        commit('setQuery', query)
      }
      if (this.getters.getQuery) {
        const CONFIG = {
          params: {
            q: this.getters.getQuery,
            startIndex: this.getters.getStartIndex,
          },
        }
        axios.get(BASE_ENDPOINT, CONFIG).then(res => {
          if (res.data) {
            console.log(res.data)
            commit('updateBooks', res.data.items)
            commit('updateStartIndex')
            commit('updateTotalItems', res.data.totalItems)
          }
        })
      }
    },
  },
  /**
   * books内のidを検索して、id値が一致するものが存在すれば取得し、なければapiを叩いて取得する
   *
   * @param id
   * @return {function(*): *}
   */
  find(id) {
    const filtered = this.getters.getBooks.filter(elm => {
      return elm.id === id
    })
    const CONFIG = {
      params: {
        q: this.query,
      },
    }
    if (!filtered) {
      axios.get(`${BASE_ENDPOINT}/${id}`, CONFIG).then(res => {
        if (res.data) {
          console.log(res.data)
        }
      })
    }
  },
})
