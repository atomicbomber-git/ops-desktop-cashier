<template>
  <div class="container-fluid pt-5">
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
import Login from './components/Login'

import events from './events'
import { ipcRenderer, remote } from 'electron'

import auth from './authentication'
import db from './database'

export default {
  name: 'app',
  components: {
    UserIndex, UserCreate, TransactionIndex, Login
  },

  mounted() {
    auth.check()
      .then(doc => {
        this.current_page = 'user-index'
      })
      .catch(err => {
        this.current_page = 'login'
      })

    ipcRenderer.on(events.PAGE_CHANGE, (event, message) => {
      this.changePage(message)
    })

    ipcRenderer.on(events.LOG_OUT, (event) => {
      auth.logOut()
        .then(() => {
          swal({
            icon: 'success',
            text: 'Anda berhasil keluar'
          })

          remote.getCurrentWebContents().send(events.PAGE_CHANGE, 'login')
        })
        .catch(error => {
          console.log(error)
        })
    })

    ipcRenderer.on(events.LOG_IN, event => {
      this.changePage('user-index')
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
        'login': Login,
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