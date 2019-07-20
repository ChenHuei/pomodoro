<template>
  <div class="home">
    <div class="container">
      <router-view :key="$route.fullPath"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style lang="scss">
@import "../styles/import";

.home {
  @include size(100%);
  > .container {
    @include size(100%);
    background-color: color(grey_dark);
  }
}
</style>
