<template>
  <div class="container pt-5">
    <component :is="current_component">
    </component>
  </div>
</template>

<script>

import UserIndex from './components/UserIndex'

export default {
  name: 'app',
  components: {
    UserIndex
  },

  computed: {
    current_component() {
      return UserIndex
    }
  }
}
</script>

<style>
</style>
