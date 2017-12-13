<template>
<div class="page">
  <div class="header">
    <button class="ranking-btn icon-button"
            v-on:click="openModal">
      <TrophyIcon class="icon" />
    </button>
    <div class="dashboard">
      <div class="greeting"
           v-if="globalState.user.name">
        {{ `Hi, ${globalState.user.name}` }}
      </div>
      <div class="best-record"
           v-if="globalState.record.correctNum !== undefined">
        {{ `Best: ${globalState.record.correctNum}` }}
      </div>
      <div class="my-rank"
           v-if="globalState.myRank !== undefined">
        {{ `Rank: ${globalState.myRank + 1}`}}
      </div>
    </div>
  </div>
  <div class="content content-hv-center">
    <div class="modal-backdrop"
         v-on:click="closeModal"
         v-if="modalOpen"></div>
    <div class="modal card"
         v-if="modalOpen">
      <div class="title">Ranking</div>
      <div class="body">
        <rank-list></rank-list>
      </div>
    </div>
    <h1>Twin<br/>Words</h1>
  </div>
  <div class="footer">
    <router-link to="/quiz"
                 class="button">Go&nbsp;
      <ChevronRightIcon class="icon" />
    </router-link>
  </div>
</div>

</template>

<script>
import TrophyIcon from '../../asset/trophy.svg';
import ChevronRightIcon from '../../asset/chevron-right.svg';

export default {
  name: 'HomePage',
  components: {
    TrophyIcon,
    ChevronRightIcon
  },
  data() {
    return {
      globalState: store.state,
      modalOpen: false
    }
  },
  methods: {
    openModal() {
      this.modalOpen = true
    },
    closeModal() {
      this.modalOpen = false
    }
  }
}

</script>

<style scoped="" lang="less">
.dashboard {
  font-size: .6em;
}
</style>
