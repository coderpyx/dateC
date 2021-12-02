<template>
  <div id="app">
    <datePicker/>
  </div>
</template>

<script>
import datePicker from './components/date-picker.vue'
export default {
  name: 'App',
  components: {
    datePicker
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  padding: 20px;
}
</style>
