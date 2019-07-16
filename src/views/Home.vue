<template>
  <div class="home">
    <SideBar/>
    <div class="container">
      <router-view :key="$route.fullPath"/>
    </div>
    <Clock/>
  </div>
</template>

<script>
import SideBar from '../components/SideBar'
import Clock from '../components/Clock'
import { TODO_LIST } from '../constants'
export default {
  name: 'Home',
  components: {
    SideBar,
    Clock
  },
  data () {
    return {
      TODO_LIST
    }
  }
}
</script>

<style lang="scss">
@import "../styles/import";

.home {
  @include size(100%);
  display: flex;
  overflow: hidden;
  background-color: color(grey_light);
  > .container {
    @include size(45%, 100%);
    background-color: color(grey_dark);
  }
}
</style>
