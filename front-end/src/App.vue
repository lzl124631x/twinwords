<template>
<div id="app"
     class="dark">
  <router-view/>
</div>

</template>

<script>
import util from './util';
import service from './service';

export default {
  name: 'app',
  mounted() {
    service.login()
      .then(auth => {
        service.userinfo(auth.openid).then(userinfo => store.updateUserInfo(userinfo))
        service.bestRecord().then(best => store.updateBestRecord(best))
        service.ranking().then(ranking => store.updateRanking(ranking))
      })
  }
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

.icon {
  width: 1em;
  height: 1em;
  fill: #fff;
}

button,
.button {
  &:extend(.content-hv-center);
  border: solid .2em #ddd;
  border-radius: .4em;
  background: transparent;
  font-size: 1.5em;
  outline: 0;
  padding: .5em;
  cursor: pointer;
  color: #fff;
  text-decoration: none;
  transition: all .15s ease-in-out;
  &:active {
    &:extend(.active-button all);
    transform: translateY(.1em);
  }
  &.icon-button,
  &.secondary-button {
    border: 0;
    &:active {
      &:extend(.active-icon-button all);
    }
  }
  &.icon-button {
    padding: .2em .3em;
  }
  &.dark {
    border-color: #444;
    &.primary {
      background: #444;
      &:active {
        &:extend(.active-button all);
      }
    }
  }
}

.active-button {
  background: #fff;
  border-color: #fff;
  color: #000;
  .icon {
    fill: #000;
  }
}

.active-icon-button {
  background: #444;
  color: #fff;
  .icon {
    fill: #fff;
  }
}

body.has-hover {
  button,
  .button {
    &:hover {
      &:extend(.active-button);
      .icon {
        fill: #000;
      }
    }
    &.icon-button:hover,
    &.secondary-button:hover {
      &:extend(.active-icon-button all);
    }
  }
}

.page {
  >.header {
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: .3em .5em;
  }

  >.footer {
    display: flex;
    padding: 1em;
    margin: 0 -.5em;
    > .col {
      padding: 0 .5em;
      flex: 1;
      .button {
        width: 100%;
        box-sizing: border-box;
      }
    }
  }
}

.content + .footer {
  padding-top: 0;
}

.card:extend(.v-flex) {
  background-color: #3b3b3b;
  border-radius: .3em;
  padding: .5em;
  .header {
    position: relative;
    margin-bottom: .5em;
    font-size: 1.1em;
    .title {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      pointer-events: none;
      text-align: center;
      width: 100%;
    }
  }
  .body {
    overflow: auto;
    flex: 1;
  }
  .section {
    &:extend(.v-flex);
    .title {
      flex: none;
    }
  }
  .section+.section:before {
    content: " ";
    display: block;
    width: 100%;
    border-top: 1px solid #555;
    margin: .5em 0;
  }
}

.v-flex {
  display: flex;
  flex-direction: column;
}

.gray-text {
  color: #999;
}

.modal-container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  pointer-events: none;
  .modal {
    position: absolute;
    width: 80%;
    height: 80%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    pointer-events: auto;
  }
}

.modal-backdrop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, .85);
}

.flex-row {
  display: flex;
  align-items: center;
  padding: .4em 0;
  >span {
    flex: 1;
    padding: 0 .25em;
  }
  >span.no-flex {
    flex: none;
  }
}
</style>
