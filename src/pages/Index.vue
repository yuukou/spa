<template>
  <div>
    <div v-show="totalCount">{{ displayCount }}/{{ totalCount }}件表示</div>
    <label for="query" class="search_label">検索ワード</label>
    <input id="query" v-model="query" type="text" @change="onChange" />
    <div v-for="book in books" :key="book.id">
      <router-link :to="{ name: 'Detail', params: { id: book.id } }">
        <img :src="getThumbnail(book)" alt="" />
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
    displayCount() {
      if (this.books) {
        return this.books.length
      }
      return false
    },
    isShowClickedMoreButton() {
      const startIndex = this.$store.getters.getStartIndex
      if (startIndex) {
        return startIndex < this.$store.getters.getTotalItems
      }
      return false
    },
    totalCount() {
      return this.$store.getters.getTotalItems
    },
  },
  methods: {
    onChange() {
      this.$store.commit('resetAll')
      if (this.query) {
        this.$store.dispatch('setBooks', this.query)
      }
    },
    clickedMore() {
      this.$store.dispatch('setBooks')
    },
    getThumbnail(book) {
      if (book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail) {
        return book.volumeInfo.imageLinks.thumbnail
      } else {
        return require('../assets/Noimage.svg')
      }
    },
  },
}
</script>

<style scoped>
.search_label {
  display: block;
  font-size: x-large;
}
</style>
