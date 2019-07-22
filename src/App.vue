<template>
  <div id="app">
    <SideBar/>
    <router-view :key="$route.fullPath"/>
    <Clock/>
  </div>
</template>

<script>
import SideBar from './components/SideBar'
import Clock from './components/Clock'
export default {
  name: 'App',
  components: {
    SideBar,
    Clock
  }
}
</script>

<style lang="scss">
@import "./styles/import";
#app {
  @include size(100vw, 100vh);
  display: flex;
  background-color: color(grey_light);
  font-size: 10px;
  font-family: $font-family;
  overflow: hidden;
}
</style>
