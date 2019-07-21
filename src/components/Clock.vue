<template>
  <div class="clock">
    <div class="now">
      <i class="material-icons">schedule</i>
      <span class="session">{{session}}</span>
      <span>{{now}}</span>
    </div>
    <div class="clockCircle">
      <canvas id="myCanvas"></canvas>
      <div class="time">
        {{time}}
      </div>
    </div>
    <div class="button" @click="startHandler">
      {{buttonTitleHandler}}
    </div>
    <ul class="progress">
      <li
        v-for="num in 5"
        :key="num"
        :class="dotClassHandler(num)">
      </li>
    </ul>
    <audio :id="RINGTONE_LIST[0].name" :src="RINGTONE_LIST[0].src"></audio>
  </div>
</template>

<script>
import { RINGTONE_LIST } from '../constants'
export default {
  name: 'Clock',
  data () {
    return {
      isStart: false,
      isFinish: false,
      pomodroTimer: '',
      pomodroMinute: 25,
      pomodroSecond: 0,
      timer: '',
      hour: 0,
      minute: 0,
      RINGTONE_LIST
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
      return `${this.zeroDigital(this.pomodroMinute)}:${this.zeroDigital(this.pomodroSecond)}`
    },
    buttonTitleHandler () {
      return this.isFinish ? 'restart' : this.isStart ? 'pause' : 'start'
    },
    progressPercent () {
      const total = 25 * 60
      const percent = 1 - Math.floor(this.pomodroMinute * 60 + this.pomodroSecond) / total
      return Math.min(percent, 1)
    }
  },
  methods: {
    dotClassHandler (num) {
      const step = (25 - this.pomodroMinute) / 5
      return {
        dot: true,
        fill: step === 5 && this.pomodroSecond === 0 ? true : step > num
      }
    },
    startHandler () {
      if (this.isFinish) {
        this.resetPomodroTime()
        return
      }
      this.isStart = !this.isStart
      if (this.isStart) {
        this.pomodroTimer = setInterval(this.setPomodroTime, 1000)
        this.setPomodroTime()
      } else {
        clearInterval(this.pomodroTimer)
      }
    },
    setTime () {
      const now = new Date()
      this.hour = now.getHours()
      this.minute = now.getMinutes()
      this.draw()
    },
    setPomodroTime () {
      if (this.pomodroSecond === 0) {
        if (this.pomodroMinute === 0) {
          this.finish()
          return
        }
        this.pomodroMinute--
        this.pomodroSecond = 59
      } else {
        this.pomodroSecond--
      }
    },
    draw () {
      const clockCircleWidth = document.querySelector('.clockCircle').offsetWidth
      const lineWidth = clockCircleWidth * 0.8
      const canvas = document.querySelector('#myCanvas')
      const ctx = canvas.getContext('2d')
      canvas.width = clockCircleWidth
      canvas.height = clockCircleWidth
      ctx.beginPath()
      ctx.arc(clockCircleWidth / 2, clockCircleWidth / 2, (clockCircleWidth - lineWidth) / 2, 0, this.progressPercent * 2 * Math.PI)
      ctx.lineWidth = lineWidth
      ctx.strokeStyle = '#FBA43E'
      ctx.stroke()
    },
    finish () {
      this.isFinish = true
      clearInterval(this.pomodroTimer)
      const audio = document.querySelector('#default')
      audio.currentTime = 0
      audio.play()
      alert('恭喜你成功專注了 25 分鐘，休息一下吧！')
      setTimeout(() => {
        audio.pause()
      }, 2000)
    },
    resetPomodroTime () {
      this.isStart = false
      this.isFinish = false
      this.pomodroMinute = 25
      this.pomodroSecond = 0
    },
    zeroDigital (target, digital = '0', count = 2) {
      return `${digital.repeat(count)}${target}`.slice(-1 * count)
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  mounted () {
    this.timer = setInterval(this.setTime, 1000)
    this.setTime()
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/import";
.clock {
  @include size(40%, 100%);
  @include flexCenter;
  flex-direction: column;
  justify-content: space-between;
  padding: 72px 5%;
  > .now {
    @include size(100%, 56px);
    @include flexCenter;
    font-size: 40px;
    line-height: 56px;
    color: color(orange);
    letter-spacing: 1px;
    > .material-icons {
      font-size: 56px;
    }
    > .session {
      margin: 0 16px 0 24px;
    }
  }
  > .clockCircle {
    @include size(30vw);
    @include flexCenter;
    position: relative;
    margin: 10% 0;
    border: 2px solid color(orange);
    border-radius: 50%;
    > #myCanvas {
      position: absolute;
      transform: rotate(-90deg);
    }
    > .time {
      @include size(80%);
      @include flexCenter;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      font-size: 88px;
      font-weight: 700;
      letter-spacing: 3px;
      color: color(white);
      background-color: color(grey_light);
      border: 2px solid color(orange);
      border-radius: 50%;
    }
  }
  > .button {
    @include size(50%, 72px);
    @include flexCenter;
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
    padding: 0 10%;
    list-style: none;
    > .dot {
      @include size(40px);
      border: 2px solid color(orange);
      border-radius: 50%;
      transition: .5s;
      &.fill {
        background: color(orange);
      }
    }
  }
}
</style>
