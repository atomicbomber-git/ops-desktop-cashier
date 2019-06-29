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
import TransactionIndex from './components/TransactionIndex'
import events from './events'
import { ipcRenderer } from 'electron'

import auth from './authentication'
import db from './database'

export default {
  name: 'app',
  components: {
    UserIndex, UserCreate, TransactionIndex
  },

  mounted() {
    auth.check()
      .then(doc => {
        console.log(doc)
      })
      .catch(err => {
        console.log(err)
      })

    ipcRenderer.on(events.PAGE_CHANGE, (event, message) => {
      this.changePage(message)
    })
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
        'transaction-index': TransactionIndex,
      }
    },

    current_component() {
      return this.page_map[this.current_page] || null
    }
  }
}
</script>

<style>
</style>
