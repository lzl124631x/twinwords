<template>
<div class="page">
  <div class="content v-flex">
    <div class="card">
      <div class="section scoreboard">
        <div class="title">Scoreboard</div>
        <div class="body">
          <div>{{ `Correct: ${globalState.correctNum}`}}</div>
          <div>{{ `Best: ${globalState.record.correctNum}`}}</div>
        </div>
      </div>
      <div class="section">
        <div class="tabs title">
          <div v-bind:class="{ active: activeTabIndex === 0 }"
               v-on:click="changeTab(0)">History</div>
          <div v-bind:class="{ active: activeTabIndex === 1 }"
               v-on:click="changeTab(1)">Ranking</div>
        </div>
        <div class="tab-content body">
          <div v-bind:class="{ active: activeTabIndex === 0 }">
            <ul v-if="globalState.history">
              <li v-for="entry in globalState.history"
                  class="flex-row history-row">
                <span class="icon no-flex"
                      v-bind:class="{ correct: entry.correct }"></span>
                <span class="zh">{{entry.zh}}</span>
                <span class="en">{{entry.en}}</span>
              </li>
            </ul>
            <div class="msg content-hv-center"
                 v-else>NO HISTORY</div>
          </div>
          <div v-bind:class="{ active: activeTabIndex === 1 }">
            <ul v-if="globalState.ranking">
              <li v-for="(rank, index) in globalState.ranking"
                  class="flex-row rank-row">
                <span class="rank-num no-flex">{{ index + 1 }}</span>
                <span class="name">{{ rank.user.name }}</span>
                <span class="correct-num">{{ rank.correctNum }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="footer">
    <a v-on:click="restart"
       class="button">Restart</a>
    <a v-on:click="backHome"
       class="button">Home</a>
  </div>
</div>

</template>

<script>
export default {
  name: 'ResultPage',
  data() {
    return {
      globalState: store.state,
      activeTabIndex: 0
    }
  },
  methods: {
    backHome() {
      this.$router.go(-2)
    },
    restart() {
      this.$router.go(-1)
    },
    changeTab(index) {
      this.activeTabIndex = index
    }
  }
}

</script>

<style scoped="" lang="less">
.tabs {
  display: flex;
  >div {
    flex: 1;
    &:not(.active) {
      color: #999;
    }
  }
}

.tab-content>div {
  display: none;
  &.active {
    display: block;
  }
}

.section.scoreboard {
  flex: none;
  .body {
    display: flex;
    div {
      flex: 1;
      font-size: .8em;
    }
  }
}

.content {
  padding: 1em;
}

.card {
  flex: 1;
  .body {
    -webkit-overflow-scrolling: touch;
  }
}

.flex-row {
  display: flex;
  align-items: center;
  padding: .3em 0;
  >span+span {
    padding-left: .5em;
  }
  >span {
    flex: 1;
  }
  >span.no-flex {
    flex: none;
  }
}

.history-row {
  .zh {
    flex: 2;
    text-align: left;
    font-size: .8em;
  }
  .icon {
    &.correct:after {
      content: '√';
      color: #81d468;
    }
    &:not(.correct):after {
      content: '×';
      color: #f05458;
    }
  }
}

.rank-row {
  .rank-num {
    font-size: .6em;
  }
  &:nth-child(1) .rank-num {
    color: gold;
    font-size: 1em;
  }
  &:nth-child(2) .rank-num {
    color: silver;
    font-size: .8em;
  }
  &:nth-child(3) .rank-num {
    color: #cd7f32;
    font-size: .7em;
  }
}
</style>
