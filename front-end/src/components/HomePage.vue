<template>
<div class="page">
  <div class="content content-hv-center">
    <div class="dashboard">
      <div class="greeting"
           v-if="state.user.name">
        {{ `Hi, ${state.user.name}` }}
      </div>
      <div class="best-record"
           v-if="state.record.correctNum !== undefined">
        {{ `Best: ${state.record.correctNum}` }}
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
      state: store.state
    }
  },
  methods: {
  }
}

</script>

<style scoped="" lang="less">
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
