<template>
  <div class="clock">
    <div class="now">
      <i class="material-icons">schedule</i>
      <span class="session">{{session}}</span>
      <span>{{now}}</span>
    </div>
    <div class="circle">
      <div class="time">
        {{time}}
      </div>
    </div>
    <div class="button" @click="startHandler">
      {{buttonTitleHandler}}
    </div>
    <ul class="progress">
      <li
        class="dot"
        v-for="num in 4"
        :key="num">
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Clock',
  data () {
    return {
      isStart: false,
      timeMinute: 25,
      timeSecond: 0,
      hour: 0,
      minute: 0
    }
  },
  computed: {
    session () {
      return this.hour >= 12 ? 'PM' : 'AM'
    },
    now () {
      return `${this.zeroDigital(this.hour % 12)}:${this.zeroDigital(this.minute)}`
    },
    time () {
      return `${this.timeMinute}:${this.zeroDigital(this.timeSecond)}`
    },
    buttonTitleHandler () {
      return this.isStart ? 'pause' : 'start'
    }
  },
  methods: {
    startHandler () {
      this.isStart = !this.isStart
    },
    zeroDigital (target, digital = '0', count = 2) {
      return `${digital.repeat(count)}${target}`.slice(-1 * count)
    }
  },
  mounted () {
    const now = new Date()
    this.hour = now.getHours()
    this.minute = now.getMinutes()
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/import";
.clock {
  @include size(40%, 100%);
  @include flexCenter;
  flex-direction: column;
  padding: 40px 5%;
  > .now {
    @include size(100%, 80px);
    @include flexCenter;
    font-size: 40px;
    color: color(orange);
    letter-spacing: 1px;
    > .material-icons {
      font-size: 56px;
    }
    > .session {
      margin: 0 16px 0 24px;
    }
  }
  > .circle {
    @include size(30vw);
    @include flexCenter;
    margin: 20% 0;
    border: 2px solid color(orange);
    border-radius: 50%;
    > .time {
      @include size(80%);
      @include flexCenter;
      font-size: 88px;
      font-weight: 700;
      letter-spacing: 3px;
      color: color(white);
      border: 2px solid color(orange);
      border-radius: 50%;
    }
  }
  > .button {
    @include size(50%, 72px);
    @include flexCenter;
    margin-bottom: 10%;
    background-color: color(orange);
    border-radius: 40px;
    font-size: 32px;
    text-transform: uppercase;
    letter-spacing: 2px;
    transition: .5s;
    cursor: pointer;
    &:hover {
      opacity: .8;
    }
  }
  > .progress {
    @include size(100%, 60px);
    @include flexCenter;
    justify-content: space-between;
    margin: 0;
    padding: 0 20%;
    list-style: none;
    > .dot {
      @include size(40px);
      border: 2px solid color(orange);
      border-radius: 50%;
    }
  }
}
</style>
