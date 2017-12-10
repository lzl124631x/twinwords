<template>
<div class="page">
  <div class="content content-hv-center">
    <div class="dashboard">
      <div class="greeting"
           v-if="globalState.user.name">
        {{ `Hi, ${globalState.user.name}` }}
      </div>
      <div class="best-record"
           v-if="globalState.record.correctNum !== undefined">
        {{ `Best: ${globalState.record.correctNum}` }}
      </div>
    </div>
    <button class="ranking-btn" v-on:click="openModal">Ranking</button>
    <div class="modal-backdrop" v-on:click="closeModal" v-if="modalOpen"></div>
    <div class="modal card" v-if="modalOpen">
      <div class="title">Ranking</div>
      <div class="body">
        <ul v-if="globalState.ranking">
          <li v-for="(rank, index) in globalState.ranking"
              class="flex-row rank-row">
            <span class="rank-num no-flex">{{ index + 1 }}</span>
            <span class="name">{{ rank.name }}</span>
            <span class="correct-num">{{ rank.correctNum }}</span>
          </li>
        </ul>
      </div>
    </div>
    <h1>Twin<br/>Words</h1>
  </div>
  <div class="footer">
    <router-link to="/quiz"
                 class="button">Go ›</router-link>
  </div>
</div>

</template>

<script>
export default {
  name: 'HomePage',
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
.ranking-btn {
  position: absolute;
  top: 1em;
  right: 1em;
}

.dashboard {
  position: absolute;
  top: 1em;
  left: 1em;
  text-align: left;
  >div {
    font-size: .6em;
  }
}
</style>
