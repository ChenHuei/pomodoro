<template>
  <div class="todolist">
    <div class="title">task list</div>
    <div class="add">
      <input type="text" class="input" placeholder="Add New Task...">
    </div>
    <ul class="list">
      <li v-for="item in TODO_LIST" :key="item.id" class="item">
        <div :class="circleClassHandler(item)"></div>
        <div class="message">{{item.message}}</div>
      </li>
      <li class="item more">more...</li>
    </ul>
  </div>
</template>

<script>
import { TODO_LIST } from '../constants'
export default {
  name: 'TodoList',
  data () {
    return {
      TODO_LIST
    }
  },
  methods: {
    circleClassHandler (item) {
      return {
        circle: true,
        complete: item.isComplete
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/import";

.todolist {
  @include size(100%);
  padding: 72px 5%;
  > .title {
    font-size: 40px;
    font-weight: 400;
    letter-spacing: 2px;
    color: color(orange);
    text-transform: uppercase;
  }
  > .add {
    @include size(100%, 72px);
    margin: 10% 0 5% 0;
    > .input {
      @include size(80%, 100%);
      padding: 0 24px;
      font-size: 24px;
      color: color(white);
      background-color: transparent;
      border: 1px solid color(orange);
      border-radius: 40px;
      letter-spacing: 1px;
      outline: none;
    }
  }
  > .list {
    margin: 0;
    padding: 0;
    list-style: none;
    > .item {
      @include size(100%, 100px);
      @include flexCenter;
      justify-content: flex-start;
      padding: 24px 24px 12px 12px;
      font-size: 28px;
      font-weight: 400;
      color: color(white);
      letter-spacing: 1px;
      border-bottom: 1px solid color(white);
      &.more {
        justify-content: flex-end;
        opacity: .6;
        border: none;
        cursor: pointer;
        &:hover {
          opacity: 1;
        }
      }
      > .circle {
        @include size(28px);
        margin-right: 36px;
        border: 1px solid color(white);
        border-radius: 50%;
        transition: .5s;
        cursor: pointer;
        &.complete {
          background-color: color(orange);
          border: 1px solid color(orange);
        }
        &:hover {
          opacity: .8;
        }
      }
    }
  }
}

</style>
