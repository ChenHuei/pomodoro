<template>
  <div class="setting">
    <div class="title">ring tone</div>
    <ul class="list">
      <li
        v-for="item in RINGTONE_LIST"
        :key="item.id"
        :class="itemClassHandler(item)">
        <div class="left">
          <div class="circle">
            <i
              v-if="item.isChecked"
              class="done material-icons">
              done
            </i>
          </div>
          <div class="name">{{item.name}}</div>
        </div>
        <i
          class="material-icons right"
          @click="playSound">
          play_circle_filled
        </i>
      </li>
    </ul>
  </div>
</template>

<script>
import { RINGTONE_LIST } from '../constants'
export default {
  name: 'Setting',
  data () {
    return {
      RINGTONE_LIST
    }
  },
  methods: {
    itemClassHandler (item) {
      return {
        item: true,
        check: item.isChecked
      }
    },
    playSound () {
      console.log('play')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/import";

.setting {
  @include size(100%);
  padding: 72px 10%;
  > .title {
    font-size: 40px;
    font-weight: 400;
    letter-spacing: 2px;
    color: color(orange);
    text-transform: uppercase;
  }
  > .list {
    @include size(100%);
    margin: 10% 0 0 0;
    padding: 0;
    list-style: none;
  }
}
.item {
  @include size(100%, 80px);
  @include flexCenter;
  justify-content: space-between;
  padding: 0 36px 0 24px;
  margin-top: 36px;
  background: color(grey);
  opacity: .8;
  transition: .5s;
  cursor: pointer;
  &:first-child {
    margin-top: 0;
  }
  &.check {
    color: color(white);
    background-color: color(orange);
    opacity: 1;
  }
  &:hover {
    transform: translateX(-8px) translateY(-8px);
  }
  > .left {
    @include flexCenter;
    justify-content: flex-start;
    > .circle {
      @include size(28px);
      margin-right: 28px;
      background-color: transparent;
      border: 2px solid color(white);
      border-radius: 50%;
      > .done {
        margin-left: 1px;
        font-size: 24px;
        color: color(white);
        background-color: transparent;
      }
    }
    > .name {
      font-size: 28px;
      font-weight: 700;
      color: color(grey_dark);
      text-transform: capitalize;
    }
  }
  > .right {
    font-size: 36px;
    cursor: pointer;
  }
}
</style>
