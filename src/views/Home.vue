<template>
  <div class="home">
    <div class="container left">
      <div class="top">
        <input class="input" type="text" placeholder="add a new mission...">
        <i class="material-icons fixed">add</i>
      </div>
      <div class="bottom">
        <div class="time">25:00</div>
        <div class="todoList">
          <ul>
            <li v-for="item in TODO_LIST" :key="item.name">{{item.name}}</li>
          </ul>
          <h4>more</h4>
        </div>
      </div>
    </div>
    <div class="container right">
      <div class="top">
        <ul>
          <li class="material-icons" v-for="item in MENU_LIST" :key="item.name">{{item.name}}</li>
        </ul>
      </div>
      <div class="bottom">
        <h4>pomodro</h4>
      </div>
    </div>
  </div>
</template>

<script>
import { MENU_LIST, TODO_LIST } from '../constants'
export default {
  name: 'Home',
  data () {
    return {
      MENU_LIST,
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
}

.container {
  display: flex;
  flex-direction: column;
  padding: 48px 85px;
  &.left {
    flex: 8;
    background-color: color(red_light);
    > .top {
      @include size(50%, 56px);
      color: color(pink);
      > .input {
        @include size(100%);
        padding: 16px;
        border: none;
        outline: none;
        &::placeholder {
          color: color(pink);
          font-weight: 700;
          font-style: italic;
          text-transform: uppercase;
        }
      }
      > .fixed {
        position: absolute;
      }
    }
  }
  &.right {
    flex: 3;
    background-color: color(blue_dark);
  }
}
</style>
