<template>
  <div>
    <div>詳細ページです</div>
    <img :src="book.volumeInfo.imageLinks.thumbnail" alt="" />
    <p>タイトル : {{ book.volumeInfo.title }}</p>
    <p>サブタイトル : {{ book.volumeInfo.subtitle }}</p>
  </div>
</template>

<script>
// import axios from 'axios'
// const ENDPOINT = 'https://www.googleapis.com/books/v1/volumes'

export default {
  name: 'Index',
  data() {
    return {
      book: null,
    }
  },
  created() {
    this.id = this.$route.params.id
    // axios.get(`${ENDPOINT}/${id}`).then(res => {
    //   this.book = res.data
    // })
  },
}
</script>
