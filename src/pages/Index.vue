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
      <!--      <a @click="clickedMore" />-->
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Index',
  data() {
    return {
      books: [],
      query: 'vue',
    }
  },
  created() {
    const ENDPOINT = 'https://www.googleapis.com/books/v1/volumes'
    const CONFIG = {
      params: {
        q: this.query,
      },
    }
    axios.get(ENDPOINT, CONFIG).then(res => {
      if (res.data) {
        this.books = res.data.items
        this.$store.commit('')
      }
    })
  },
  methods: {
    onChange() {
      const ENDPOINT = 'https://www.googleapis.com/books/v1/volumes'
      const CONFIG = {
        params: {
          q: this.query,
        },
      }
      axios.get(ENDPOINT, CONFIG).then(res => {
        if (res.data) {
          this.books = res.data.items
          this.$store.commit('')
        }
      })
    },
  },
}
</script>
