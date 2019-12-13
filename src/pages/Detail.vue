<template>
  <div>
    <div>詳細ページです</div>
    <img :src="book.volumeInfo.imageLinks.thumbnail" alt="" />
    <p>タイトル : {{ book.volumeInfo.title }}</p>
    <p>サブタイトル : {{ book.volumeInfo.subtitle }}</p>
  </div>
</template>

<script>
export default {
  name: 'Index',
  computed: {
    book() {
      console.log(this.$store.getters.find(this.$route.params.id))
      return this.$store.getters.find(this.$route.params.id)
    },
  },
}
</script>
