<template>
  <div class="analysis">
    <div class="title">Analysis</div>
    <div class="list">
      <div class="item" v-for="item in ANALYSIS_RECORD" :key="item.id">
        <div class="left">
          <div class="name">{{item.name}}</div>
          <div class="number">{{item.number}}</div>
        </div>
        <div class="right">/ tomato</div>
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
            v-for="row in 6"
            :key="row">
            <div class="unit">{{unitHandler(row)}}</div>
            <div
              class="cell"
              v-for="item in ANALYSIS_TABLE"
              :key="item.date">
              <div
                v-if="row === 6"
                class="date">
                {{item.date}}
              </div>
              <div
                v-if="row === 6"
                class="dot"
                :style="dotStyleHandler(item.number)"></div>
            </div>
          </div>
        </div>
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
      ANALYSIS_RECORD,
      ANALYSIS_TABLE
    }
  },
  computed: {
    showWeekHandler () {
      return '2019.07.03 - 2019.07.09'
    }
  },
  methods: {
    unitHandler (row) {
      return (7 - row) * 2
    },
    dotStyleHandler (number) {
      return {
        bottom: `${30 * number}px`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/import";

.analysis {
  @include size(100%);
  padding: 72px 10%;
  > .title {
    color: color(orange);
    font-size: 40px;
    font-weight: 400;
    letter-spacing: 2px;
    text-transform: uppercase;
  }
}

.list {
  @include size(100%, 144px);
  @include flexCenter;
  margin-top: 80px;
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
        font-size: 40px;
        letter-spacing: 1px;
        text-transform: capitalize;
      }
      > .number {
        color: color(orange);
        font-size: 60px;
      }
    }
    > .right {
      justify-content: flex-end;
      color: color(grey);
      font-size: 24px;
      line-height: 40px;
      letter-spacing: 1px;
      opacity: .6;
    }
  }
}

.graphy {
  @include size(100%, auto);
  position: relative;
  margin-top: 45%;
  > .daterange {
    @include size(100%, auto);
    @include flexCenter;
    margin-bottom: 60px;
    font-size: 28px;
    color: color(grey);
    > i {
      font-size: 40px;
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
    @include size(calc(100% - 18px), 360px);
    position: relative;
    overflow: hidden;
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
      font-size: 20px;
    }
    > .cell {
      @include size(calc(100% / 7), 60px);
      position: relative;
      border: 1px solid color(grey);
      > .date {
        position: absolute;
        bottom: 0;
        left: 0;
        color: color(orange);
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
