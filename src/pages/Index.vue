<template>
  <div>
    <div>Indexページです</div>
    <label for="query">検索ワード</label>
    <input id="query" v-model="query" type="text" @change="onChange" />
    <div v-for="book in books" :key="book.id">
      <router-link
        :to="{ name: 'Detail', params: { id: book.id, book: book } }"
      >
        <img :src="book.volumeInfo.imageLinks.thumbnail" alt="" />
        <p>タイトル : {{ book.volumeInfo.title }}</p>
        <p>サブタイトル : {{ book.volumeInfo.subtitle }}</p>
      </router-link>
    </div>
    <button v-show="isShowClickedMoreButton" @click="clickedMore">
      もっとみる
    </button>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      query: null,
    }
  },
  computed: {
    books() {
      return this.$store.getters.getBooks
    },
    isShowClickedMoreButton() {
      const startIndex = this.$store.getters.getStartIndex
      if (startIndex) {
        return startIndex < this.$store.getters.getTotalItems
      }
      return false
    },
  },
  // created() {
  //   const ENDPOINT = 'https://www.googleapis.com/books/v1/volumes'
  //   const CONFIG = {
  //     params: {
  //       q: this.query,
  //     },
  //   }
  //   axios.get(ENDPOINT, CONFIG).then(res => {
  //     if (res.data) {
  //       this.books = res.data.items
  //       this.$store.commit('')
  //     }
  //   })
  // },
  methods: {
    onChange() {
      if (this.query) {
        this.$store.dispatch('getBooks', this.query)
      }
    },
    clickedMore() {
      this.$store.dispatch('getBooks', this.query)
    },
  },
}
</script>
