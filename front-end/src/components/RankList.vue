<template>
<div class="rank-list v-flex">
  <div class="my-rank flex-row rank-row">
    <span class="rank-num no-flex">{{ globalState.myRank + 1 }}</span>
    <span class="name">{{ globalState.user && globalState.user.name }}</span>
    <span class="correct-num">{{ globalState.record.correctNum }}</span>
  </div>
  <div class="leaderboard">
    <ul v-if="globalState.ranking" class="gray-text">
      <li v-for="(rank, index) in globalState.ranking"
          class="flex-row rank-row">
        <span class="rank-num no-flex">{{ index + 1 }}</span>
        <span class="name">{{ rank.user && rank.user.name }}</span>
        <span class="correct-num">{{ rank.correctNum }}</span>
      </li>
    </ul>
  </div>
  <button class="btn-refresh-rank secondary-button" v-on:click="refreshRanking"><icon-redo class="icon"/>&nbsp;Refresh</button>
</div>

</template>

<script>
import service from '../service';
export default {
  name: 'RankList',
  data() {
    return {
      globalState: store.state
    }
  },
  methods: {
    refreshRanking() {
      service.ranking().then(ranking => store.updateRanking(ranking))
    }
  }
}

</script>

<style scoped="" lang="less">
.rank-list {
  height: 100%;
  .leaderboard {
    overflow: auto;
    flex: 1;
  }
}
.rank-row {
  .rank-num {
    font-size: 1em;
  }
  &:nth-child(1) .rank-num {
    color: gold;
  }
  &:nth-child(2) .rank-num {
    color: silver;
  }
  &:nth-child(3) .rank-num {
    color: #cd7f32;
  }
}

.my-rank {
  background: #333;
}

.btn-refresh-rank {
  width: 100%;
  font-size: 1em;
}
</style>
