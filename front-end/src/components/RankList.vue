<template>
<div class="rank-list">
  <div class="my-rank flex-row rank-row">
    <span class="rank-num no-flex">{{ globalState.myRank + 1 }}</span>
    <span class="name">{{ globalState.user && globalState.user.name }}</span>
    <span class="correct-num">{{ globalState.record.correctNum }}</span>
  </div>
  <ul v-if="globalState.ranking">
    <li v-for="(rank, index) in globalState.ranking"
        class="flex-row rank-row">
      <span class="rank-num no-flex">{{ index + 1 }}</span>
      <span class="name">{{ rank.user && rank.user.name }}</span>
      <span class="correct-num">{{ rank.correctNum }}</span>
    </li>
  </ul>
</div>

</template>

<script>
export default {
  name: 'RankList',
  data() {
    return {
      globalState: store.state
    }
  },
  methods: {
  }
}

</script>

<style scoped="" lang="less">
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

.my-rank {
  background: #333;
}
</style>
