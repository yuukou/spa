<template>
  <div class="content_wrapper">
    <div v-show="totalCount" class="total_count">
      {{ displayCount }}/{{ totalCount }}件
    </div>
    <b-container fluid class="search_box">
      <b-row class="my-1">
        <b-col sm="2">
          <label for="input-default" v-text="`検索ワード:`" />
        </b-col>
        <b-col sm="10">
          <b-form-input
            id="input-default"
            v-model="query"
            placeholder="検索ワード"
            @change="onChange"
          />
        </b-col>
      </b-row>
    </b-container>

    <transition-group tag="div" class="search_content_wrapper" name="book_list">
      <div v-for="book in books" :key="book.id" class="search-content">
        <div>
          <b-card no-body class="overflow-hidden book_card">
            <router-link
              :to="{ name: 'Detail', params: { id: book.id } }"
              class="book_card_link"
            >
              <b-row no-gutters>
                <b-col md="6" class="book_card_thumbnail_wrapper">
                  <b-card-img
                    :src="getThumbnail(book)"
                    fluid
                    class="rounded-0 book_card_thumbnail"
                  />
                </b-col>
                <b-col md="6">
                  <b-card-body
                    :title="book.volumeInfo.title"
                    class="book_card_body"
                    title-tag="div"
                  >
                    <b-card-text v-text="book.volumeInfo.subtitle" />
                  </b-card-body>
                </b-col>
              </b-row>
            </router-link>
          </b-card>
        </div>
      </div>
    </transition-group>
    <div class="btn_wrapper">
      <b-button
        v-show="isShowClickedMoreButton"
        variant="dark"
        @click="clickedMore"
        >もっとみる</b-button
      >
    </div>
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
/*共通 開始*/
.book_card_link {
  text-decoration: none;
  color: black;
}
.search_box {
  margin: 40px 0;
}
/*共通 終了*/

/*transition 開始*/
.book_list-enter-active {
  opacity: 0;
  transform: translateX(50px);
  transition-property: transform, opacity;
  transition-duration: 0.6s;
  transition-timing-function: cubic-bezier(0.77, 0, 0.175, 1);
  transition-delay: 0s;
}
.book_list-enter-to {
  opacity: 1;
  transform: translateX(0);
}
.book_list-leave-active {
  opacity: 1;
  transform: translateX(0);
  transition-property: transform, opacity;
  transition-duration: 0.6s;
  transition-timing-function: cubic-bezier(0.77, 0, 0.175, 1);
  transition-delay: 0s;
}
.book_list-leave-to {
  opacity: 0;
  transform: translateX(50px);
}
.book_list-move {
  transition-property: transform;
  transition-duration: 0.6s;
  transition-timing-function: cubic-bezier(0.77, 0, 0.175, 1);
  transition-delay: 0s;
}
/*transition 終了*/

/*スマホ 開始*/
@media screen and (max-width: 900px) {
  .content_wrapper {
    width: 100%;
    margin: 0 auto;
    padding: 1rem;
  }
  .total_count {
    font-size: 18px;
    color: #e83e8c;
    font-weight: bolder;
  }
  .book_card {
    max-width: 300px;
    margin: 30px auto;
  }
}
/*スマホ 終了*/

/*PC 開始*/
@media screen and (min-width: 900px) {
  .content_wrapper {
    width: 900px;
    margin: 0 auto;
  }
  .search_content_wrapper {
    margin-bottom: 50px;
  }
  .book_card {
    max-width: 300px;
    margin: 30px auto;
    max-height: 180px;
  }
  .book_card_body {
    font-size: 15px;
    text-align: left;
  }
  .total_count {
    font-size: 25px;
    color: #e83e8c;
    font-weight: bolder;
  }
}
/*PC 終了*/
</style>
