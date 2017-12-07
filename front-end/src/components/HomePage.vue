<template>
<div class="page">
  <div class="content content-hv-center">
    <div class="greeting"
         v-if="user.name">
      {{ `Hi, ${user.name}` }}
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
      user: window.user
    }
  },
  methods: {
  }
}

</script>

<style scoped="" lang="less">
.greeting {
  position: absolute;
  top: 1em;
  left: 1em;
    font-size: .6em; 
}
</style>
