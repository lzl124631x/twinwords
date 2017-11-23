<template>
<div id="app"
     class="dark">
  <router-view/>
</div>

</template>

<script>
export default {
  name: 'app'
}

</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  -webkit-tap-highlight-color: transparent;
}

html,
body {
  height: 100%;
}

#app {
  font-family: 'Microsoft YaHei', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
  color: #2c3e50;
  background: #fff;
}

#app.dark {
  color: #fff;
  background: #191919;
}

.button {
  display: inline-block;
  border: solid .2em #ddd;
  border-radius: .4em;
  padding: .5em 1em;
  cursor: pointer;
  color: #fff;
  text-decoration: none;
  &:hover {
    background: #fff;
    border-color: #fff;
    color: #000;
  }
  &:active {
    transform: translateY(.1em);
  }
}
</style>
