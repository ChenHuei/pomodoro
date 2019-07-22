<template>
  <div class="setting">
    <div class="title">ring tone</div>
    <ul class="list">
      <li
        v-for="item in RINGTONE_LIST"
        :key="item.id"
        :class="itemClassHandler(item)"
        @click="checkRingTone(item)">
        <div class="left">
          <div class="circle">
            <i class="done material-icons">
              done
            </i>
          </div>
          <div class="name">{{item.name}}</div>
        </div>
        <i
          class="material-icons right"
          @click="playSound(item)">
          play_circle_filled
          <audio :data-id="item.id" :src="item.src"></audio>
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
      isPlaying: false,
      id: 0,
      RINGTONE_LIST
    }
  },
  methods: {
    itemClassHandler (item) {
      return {
        item: true,
        check: item.id === this.id
      }
    },
    checkRingTone (item) {
      this.id = item.id
    },
    playSound (item) {
      if (this.isPlaying) return
      const audio = document.querySelector(`audio[data-id='${item.id}']`)
      if (!audio) return
      this.isPlaying = true
      audio.currentTime = 0
      audio.play()
      setTimeout(() => {
        audio.pause()
        this.isPlaying = false
      }, 1500)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/import";

@include scrollBar;
.setting {
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
  > .list {
    @include size(100%, auto);
    margin: 10% 0 0 0;
    padding: 0;
    list-style: none;
  }
}
.item {
  @include size(100%, 4.4rem);
  @include flexCenter;
  justify-content: space-between;
  padding: 0 1.2rem 0 1.6rem;
  margin-top: 1.6rem;
  background: color(grey);
  opacity: .8;
  transition: .5s;
  cursor: pointer;
  &:first-child {
    margin-top: 0;
  }
  &:hover {
    transform: translateX(-8px) translateY(-8px);
  }
  > .left {
    @include flexCenter;
    justify-content: flex-start;
    > .circle {
      @include size(1.6rem);
      margin-right: 2rem;
      background-color: transparent;
      border: 2px solid color(white);
      border-radius: 50%;
      > .done {
        display: none;
        font-size: 1.4rem;
        color: color(white);
        background-color: transparent;
      }
    }
    > .name {
      color: color(grey_dark);
      font-size: 1.6rem;
      font-weight: 700;
      text-transform: capitalize;
    }
  }
  > .right {
    padding: 24px;
    font-size: 32px;
    cursor: pointer;
  }
}

.item {
  &.check {
    color: color(white);
    background-color: color(orange);
    opacity: 1;
    > .left {
      > .circle {
        > .done {
          display: block;
        }
      }
    }
  }
}
</style>
