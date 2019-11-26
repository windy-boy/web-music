<template>
  <div>
    <top-bar></top-bar>
    <router-view />
    <btm-bar></btm-bar>
  </div>
</template>
<script>
import topBar from '../top-bar'
import btmBar from '../btm-bar'
export default {
   components: {
    topBar,
    btmBar
  }
}
</script>