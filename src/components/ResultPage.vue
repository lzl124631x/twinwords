<template>
<div class="result-page">
  <h1>结束</h1>
  <a v-on:click="backHome"
     class="button">Home</a>
  <a v-on:click="restart"
     class="button">Restart</a>
</div>

</template>

<script>
export default {
  name: 'ResultPage',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
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
