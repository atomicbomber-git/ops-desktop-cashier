<template>
  <div class="container pt-5">
    <component
      @change-page="this.changePage"
      :is="current_component">
    </component>
  </div>
</template>

<script>

import UserIndex from './components/UserIndex'
import UserCreate from './components/UserCreate'
import { parse } from 'path';

export default {
  name: 'app',
  components: {
    UserIndex, UserCreate
  },

  methods: {
    changePage(page) {
      this.current_page = page
    }
  },

  data() {
    return {
      current_page: 'user-index'
    }
  },

  computed: {
    page_map() {
      return {
        'user-index': UserIndex,
        'user-create': UserCreate,
      }
    },

    current_component() {
      return this.page_map[this.current_page]
    }
  }
}
</script>

<style>
</style>
