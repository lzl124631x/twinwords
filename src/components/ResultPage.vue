<template>
<div class="page">
  <div class="header">
    <div class="card">
      <div class="title">Scoreboard</div>
      <div>Correct: {{ globalState.correctNum }}</div>
    </div>
  </div>
  <div class="content v-flex">
    <div class="card">
      <div class="title">History</div>
      <div class="body">
        <ul v-if=globalState.history>
          <li v-for="entry in globalState.history"
              class="history-row">
            <span>{{entry.zh}}</span>
            <span>{{entry.en}}</span>
            <span class="icon"
                  v-bind:class="{ correct: entry.correct }"></span>
          </li>
        </ul>
        <div class="msg content-hv-center"
             v-else>NO HISTORY</div>
      </div>
    </div>
  </div>
  <div class="footer">
    <a v-on:click="backHome"
       class="button">Home</a>
    <a v-on:click="restart"
       class="button">Restart</a>
  </div>
</div>

</template>

<script>
export default {
  name: 'ResultPage',
  data() {
    return {
      globalState: store.state
    }
  },
  methods: {
    backHome() {
      this.$router.go(-2)
    },
    restart() {
      this.$router.go(-1)
    }
  }
}

</script>

<style scoped="" lang="less">
.header {
  padding: 1em;
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
  display: flex;
  padding: .3em 0;
  span {
    flex: 1;
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
</style>
