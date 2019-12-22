<template>
  <div id="app">
    <!-- <top-bar></top-bar> -->
    <router-view />
    <!-- <btm-bar></btm-bar> -->
  </div>
</template>

<script>
// import topBar from './components/top-bar'
// import btmBar from './components/btm-bar'
export default {
  name: 'app',
  // components: {
  //   topBar,
  //   btmBar
  // }
}
</script>

<style>
html, body {
  margin: 0;
  min-width: 982px;
  font-size: 12px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
