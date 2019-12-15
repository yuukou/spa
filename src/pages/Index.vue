<template>
  <div>
    <div v-show="totalCount">{{ displayCount }}/{{ totalCount }}件</div>
    <div class="text-input">
      <label for="query" class="search_label">検索ワード</label>
      <input
        id="query"
        v-model="query"
        type="text"
        class="search_box"
        @change="onChange"
      />
    </div>

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
@import url(https://fonts.googleapis.com/css?family=Montserrat);
body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: Montserrat;
  background: #313e50;
}

.text-input {
  margin: 50px 0;
}
.text-input input[type='text'] {
  display: inline-block;
  width: 500px;
  height: 50px;
  font-size: 20px;
  line-height: 20px;
  box-sizing: border-box;
  outline: none;
  border: 1px solid lightgray;
  border-radius: 0 3px 3px 0;
  padding: 10px 10px 10px 10px;
  transition: all 0.1s ease-out;
}
.text-input label {
  top: 0;
  left: 0;
  bottom: 0;
  height: 50px;
  line-height: 50px;
  font-size: 22px;
  font-weight: bold;
  color: white;
  border-radius: 3px 0 0 3px;
  padding: 10px 20px;
  background: #e03616;
  -webkit-transform: translateZ(0) translateX(0);
  transform: translateZ(0) translateX(0);
  transition: all 0.3s ease-in;
  transition-delay: 0.2s;
}
</style>
