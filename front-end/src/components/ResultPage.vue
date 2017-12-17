<template>
<div class="page">
  <div class="content v-flex">
    <div class="card">
      <div class="section scoreboard">
        <div class="header">Scoreboard</div>
        <div class="body">
          <div>
            <span class="label gray-text">Correct</span>
            <span class="value">{{globalState.correctNum}}</span></div>
          <div>
            <span class="label gray-text">Best</span>
            <span class="value">{{globalState.record.correctNum}}</span>
          </div>
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
            <ul v-if="globalState.history" class="gray-text">
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
    <div class="col">
      <a v-on:click="restart"
         class="button dark primary"><RedoIcon class="icon"/>&nbsp;Restart</a>
    </div>
    <div class="col">
      <a v-on:click="backHome"
         class="button dark"><HomeIcon class="icon"/>&nbsp;Home</a>
    </div>
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
    font-size: 1.1em;
    padding: .4em 0;
    border-bottom: .2em solid #555;
    &:not(.active) {
      color: #555;
      border-color: transparent;
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
    padding: .5em 0;
    div {
      flex: 1;
      .value {
        font-size: 1.2em;
      }
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
