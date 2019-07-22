<template>
  <div class="analysis">
    <div class="top">
      <div class="title">Analysis</div>
      <div class="list">
        <div class="item" v-for="item in ANALYSIS_RECORD" :key="item.id">
          <div class="left">
            <div class="name">{{item.name}}</div>
            <div :class="numberClassHandler(item.name)">
              {{showNumberHandler(item.name)}}
            </div>
          </div>
          <div class="right">/ tomato</div>
        </div>
      </div>
    </div>
    <div class="graphy">
      <div class="daterange">
        <i class="material-icons">keyboard_arrow_left</i>
        <div class="week">
          {{showWeekHandler}}
        </div>
        <i class="material-icons">keyboard_arrow_right</i>
      </div>
      <div class="containter">
        <div class="table">
          <div
            class="row"
            v-for="row in rows"
            :key="row">
            <div class="unit">{{unitHandler(row)}}</div>
            <div
              class="cell"
              v-for="item in ANALYSIS_TABLE"
              :key="item.date">
              <div
                v-if="row === rows"
                class="date">
                {{item.date}}
              </div>
              <div
                v-if="row === rows"
                class="dot"
                :style="dotStyleHandler(item.number)"></div>
            </div>
          </div>
        </div>
        <canvas id="canvas"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import { ANALYSIS_RECORD, ANALYSIS_TABLE } from '../constants'
export default {
  name: 'Analysis',
  data () {
    return {
      rows: 6,
      todayNumber: 0,
      todayNumberVisabled: 0,
      weekNumber: 0,
      weekNumberVisabled: 0,
      ANALYSIS_RECORD,
      ANALYSIS_TABLE
    }
  },
  computed: {
    showWeekHandler () {
      return '2019.07.03 - 2019.07.09'
    }
  },
  watch: {
    todayNumber () {
      this.runToday()
    },
    weekNumber () {
      this.runWeek()
    }
  },
  methods: {
    unitHandler (row) {
      return (7 - row) * 2
    },
    dotStyleHandler (number) {
      return {
        bottom: `${1.6 * number}rem`
      }
    },
    showNumberHandler (name) {
      return this[`${name}NumberVisabled`]
    },
    numberClassHandler (name) {
      const target = `${name}Number`
      return {
        number: true,
        running: this[target] !== this[`${target}Visabled`]
      }
    },
    runToday () {
      const diff = Math.floor((this.todayNumber - this.todayNumberVisabled) * 0.1)
      if (diff === 0) {
        this.todayNumberVisabled = this.todayNumber
      } else {
        this.todayNumberVisabled += diff
        window.requestAnimationFrame(this.runToday)
      }
    },
    runWeek () {
      const diff = Math.floor((this.weekNumber - this.weekNumberVisabled) * 0.1)
      if (diff === 0) {
        this.weekNumberVisabled = this.weekNumber
      } else {
        this.weekNumberVisabled += diff
        window.requestAnimationFrame(this.runWeek)
      }
    },
    draw () {
      const tableWidth = document.querySelector('.table').offsetWidth
      const tableHeight = document.querySelector('.table').offsetHeight
      const unitWidth = tableWidth / this.ANALYSIS_TABLE.length
      const canvas = document.querySelector('#canvas')
      const ctx = canvas.getContext('2d')
      canvas.width = tableWidth
      canvas.height = tableHeight
      ctx.beginPath()
      ctx.moveTo(0, tableHeight)
      this.ANALYSIS_TABLE.forEach((item, index) => {
        ctx.lineTo(index * unitWidth, tableHeight * (1 - (item.number / (this.rows * 2))))
      })
      ctx.lineTo(unitWidth * (this.ANALYSIS_TABLE.length - 1), tableHeight)
      ctx.closePath()
      ctx.fillStyle = 'rgba(251, 164, 62, 0.5)'
      ctx.strokeStyle = '#FFF'
      ctx.fill()
      ctx.stroke()
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.draw)
  },
  mounted () {
    this.todayNumber = this.ANALYSIS_RECORD[0].number
    this.weekNumber = this.ANALYSIS_RECORD[1].number
    this.draw()
    window.addEventListener('resize', this.draw)
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/import";

.analysis {
  @include size(100%);
  @include flexCenter;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 56px 10%;
  > .top {
    @include size(100%, auto);
    > .title {
      color: color(orange);
      font-size: 2.8rem;
      font-weight: 400;
      letter-spacing: 2px;
      text-transform: uppercase;
    }
  }
}

.list {
  @include size(100%, 8rem);
  @include flexCenter;
  margin-top: 5%;
  > .item {
    @include size(50%, 100%);
    @include flexCenter;
    justify-content: flex-start;
    padding-right: 5%;
    &:last-child {
      padding-right: 0;
      padding-left: 5%;
    }
    > .left, .right {
      @include size(50%, 100%);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      > .name {
        color: color(grey);
        font-size: 2rem;
        letter-spacing: 1px;
        text-transform: capitalize;
      }
      > .number {
        color: color(orange);
        font-size: 3.2rem;
        &.running {
          transform: scale(1.2);
          transition: .5s;
        }
      }
    }
    > .right {
      justify-content: flex-end;
      color: color(grey);
      font-size: 1.6rem;
      line-height: 40px;
      letter-spacing: 1px;
      opacity: .6;
    }
  }
}

.graphy {
  @include size(100%, auto);
  position: relative;
  > .daterange {
    @include size(100%, auto);
    @include flexCenter;
    margin-bottom: 6%;
    font-size: 2rem;
    color: color(grey);
    > i {
      font-size: 3.2rem;
      cursor: pointer;
      &:hover {
        opacity: .8;
      }
    }
    > .week {
      margin: 0 16px;
    }
  }
  > .containter {
    @include size(calc(100% - 18px), 19.2rem);
    position: relative;
    overflow: hidden;
    > #canvas {
      position: absolute;
      left: 36px;
      bottom: 32px;
    }
  }
}

.table {
  @include size(100%);
  position: absolute;
  bottom: -4px;
  left: 0;
  margin: 0 0 36px 36px;
  > .row {
    @include size(100%, auto);
    @include flexCenter;
    position: relative;
    justify-content: space-around;
    > .unit {
      @include size(24px);
      @include flexCenter;
      position: absolute;
      left: -40px;
      top: -10px;
      color: color(orange);
      font-size: 1rem;
    }
    > .cell {
      @include size(calc(100% / 7), 3.2rem);
      position: relative;
      border: 1px solid color(grey);
      > .date {
        position: absolute;
        bottom: 0;
        left: 0;
        color: color(orange);
        font-size: 1rem;
        transform: translateX(-50%) translateY(200%);
        letter-spacing: 1px;
      }
      > .dot {
        @include size(12px);
        position: absolute;
        left: 0;
        background-color: color(white);
        border-radius: 50%;
        transform: translateX(-50%) translateY(50%);
      }
    }
  }
}
</style>
