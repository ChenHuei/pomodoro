<template>
  <div class="todolist">
    <div class="title">task list</div>
    <div class="add">
      <input
        type="text"
        class="input"
        placeholder="Add New Task..."
        v-model.trim="message"
        @keyup.enter="addTodoList"
        >
    </div>
    <ul class="list">
      <li
        class="item"
        v-for="(item, index) in todoList"
        :key="item.id"
        v-show="showItemHandler(index)">
        <div
          :class="circleClassHandler(item)"
          @click="completeTodo(item)">
          <i class="done material-icons">
            done
          </i>
        </div>
        <div class="message">{{item.message}}</div>
      </li>
      <li
        v-if="todoList.length > 3"
        class="item more"
        @click="changeMoreHandler">{{showMoreTitleHandler}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TodoList',
  data () {
    return {
      isMore: false,
      message: '',
      todoList: [{
        id: 0,
        message: 'The first thing to do today',
        isComplete: false
      },
      {
        id: 1,
        message: 'The second thing to do today',
        isComplete: false
      },
      {
        id: 2,
        message: 'The third thing to do today',
        isComplete: false
      }]
    }
  },
  computed: {
    maxID () {
      return [...this.todoList].sort((a, b) => b.id - a.id)[0].id + 1
    },
    showMoreTitleHandler () {
      return this.isMore ? 'less...' : 'more...'
    }
  },
  methods: {
    changeMoreHandler () {
      this.sortTodoList()
      this.isMore = !this.isMore
    },
    circleClassHandler (item) {
      return {
        circle: true,
        complete: item.isComplete
      }
    },
    showItemHandler (index) {
      return index < 3 ? true : this.isMore
    },
    sortTodoList () {
      this.todoList.sort((a, b) => a.isComplete - b.isComplete)
    },
    addTodoList (event) {
      if (!this.message) return
      const todo = {
        id: this.maxID,
        message: this.message,
        isComplete: false
      }
      this.todoList.unshift(todo)
      this.sortTodoList()
      this.message = ''
    },
    completeTodo (item) {
      item.isComplete = !item.isComplete
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/import";

@include scrollBar;

.todolist {
  @include size(100%);
  padding: 56px 10%;
  overflow-y: scroll;
  > .title {
    font-size: 2.8rem;
    font-weight: 400;
    letter-spacing: 2px;
    color: color(orange);
    text-transform: uppercase;
  }
  > .add {
    @include size(100%, 4.8rem);
    margin: 6% 0 3% 0;
    > .input {
      @include size(80%, 100%);
      padding: 0 2rem;
      font-size: 1.6rem;
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
      @include size(100%, 6rem);
      @include flexCenter;
      justify-content: flex-start;
      padding: 24px 8px 8px;
      font-size: 1.6rem;
      font-weight: 400;
      color: color(white);
      letter-spacing: 1px;
      border-bottom: 1px solid color(white);
      transition: 1s;
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
        @include size(1.6rem);
        margin-right: 1.6rem;
        border: 1px solid color(white);
        border-radius: 50%;
        transition: .5s;
        cursor: pointer;
        &.complete {
          background-color: color(orange);
          border: 1px solid color(orange);
          > .done {
            display: block;
          }
        }
        &:hover {
          opacity: .8;
        }
        > .done {
          display: none;
          transition: .5s;
        }
      }
    }
  }
}
</style>
