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
}

ul {
  list-style: none;
}

html,
body {
  height: 100%;
}

body {
  -webkit-tap-highlight-color: transparent;
  -webkit-user-select: none;
}

.content-hv-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

#app {
  font-family: 'Microsoft YaHei', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
  color: #2c3e50;
  background: #fff;
  overflow: hidden;
  font-size: 1.5em;
  .page:extend(.v-flex) {
    height: 100%;
    .content {
      flex: 1;
    }
  }
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
  &:active {
    &:extend(.active-button);
    transform: translateY(.1em);
  }
}

.active-button {
  background: #fff;
  border-color: #fff;
  color: #000;
}

body.has-hover {
  .button:hover {
    &:extend(.active-button);
  }
}

.footer {
  width: 100%;
  display: flex;
  .button {
    margin: 1em;
    flex: 1;
  }
}

.card:extend(.v-flex) {
  background-color: #3b3b3b;
  border-radius: .3em;
  padding: .5em;
  .title {
    font-size: 1.2em;
    margin-bottom: .5em;
  }
  .body {
    overflow: auto;
    flex: 1;
  }
}

.v-flex {
  display: flex;
  flex-direction: column;
}

.msg {
  color: #999;
}
</style>
