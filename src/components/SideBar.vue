<template>
  <div class="sidebar">
    <ul class="menu">
      <router-link
        v-for="item in MENU_LIST"
        :key="item.name"
        :to="item.link"
        :class="itemClassHandler(item.link)">
        <li class="material-icons icon">
          {{item.name}}
        </li>
      </router-link>
    </ul>
    <router-link class="logo" to="/">
      pomodoro
    </router-link>
  </div>
</template>

<script>
import { MENU_LIST } from '../constants'
export default {
  name: 'SideBar',
  data () {
    return {
      MENU_LIST
    }
  },
  methods: {
    itemClassHandler (link) {
      return {
        item: true,
        active: this.$route.path === link
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/import";
.sidebar {
  @include size(10%, 100%);
  @include flexCenter;
  flex-direction: column;
  justify-content: space-between;
  padding: 40px 0;
  > .menu {
    @include flexCenter;
    flex-direction: column;
    align-items: space-between;
    margin: 0;
    padding: 0;
    > .item {
      @include size(4.4rem);
      @include flexCenter;
      margin: 1.2rem 0;
      color: color(orange);
      border: 1px solid color(orange);
      border-radius: 50%;
      transition: .5s;
      text-decoration: none;
      cursor: pointer;
      &.active {
        color: color(white);
        background-color: color(orange);
      }
      &:hover {
        opacity: 0.8;
      }
      > .icon {
        font-size: 2.4rem;
      }
    }
  }
  > .logo {
    font-size: 2.4rem;
    color: color(orange);
    font-weight: 700;
    letter-spacing: 6px;
    text-transform: uppercase;
    text-decoration: none;
    transform: rotate(-90deg) translateX(50%);
    cursor: pointer;
  }
}
</style>
