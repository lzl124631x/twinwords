<template>
<div class="page">
  <div class="content v-flex">
    <div class="card">
      <div class="section scoreboard">
        <div class="header">Scoreboard</div>
        <div class="body">
          <div>{{ `Correct: ${globalState.correctNum}`}}</div>
          <div>{{ `Best: ${globalState.record.correctNum}`}}</div>
        </div>
      </div>
      <div class="section history-and-rank">
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
                <span class="no-flex content-hv-center">
                  <CheckIcon v-if="entry.correct" class="icon correct"/>
                  <TimesIcon v-else class="icon"/>
                </span>
                <span class="zh">{{entry.zh}}</span>
                <span class="en">{{entry.en}}</span>
              </li>
            </ul>
            <div class="msg content-hv-center"
                 v-else>NO HISTORY</div>
          </div>
          <div v-bind:class="{ active: activeTabIndex === 1 }">
            <rank-list></rank-list>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="footer">
    <a v-on:click="restart"
       class="button"><RedoIcon class="icon"/>&nbsp;Restart</a>
    <a v-on:click="backHome"
       class="button"><HomeIcon class="icon"/>&nbsp;Home</a>
  </div>
</div>

</template>

<script>
import CheckIcon from '../../asset/check.svg';
import TimesIcon from '../../asset/times.svg';
import RedoIcon from '../../asset/redo-alt.svg';
import HomeIcon from '../../asset/home.svg';

export default {
  name: 'ResultPage',
  components: {
    CheckIcon,
    TimesIcon,
    RedoIcon,
    HomeIcon
  },
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
    height: 100%;
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

.section.history-and-rank {
  flex: 1;
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

.history-row {
  .zh {
    flex: 2;
    text-align: left;
    font-size: .8em;
  }
  .icon {
    &.correct {
      fill: #81d468;
    }
    &:not(.correct) {
      fill: #f05458;
    }
  }
}
</style>
