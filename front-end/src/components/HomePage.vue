<template>
<div class="page">
  <div class="header">
    <button class="ranking-btn icon-button"
            v-on:click="openModal">
      <TrophyIcon class="icon" />
    </button>
  </div>
  <div class="content">
    <div class="modal-backdrop"
         v-on:click="closeModal"
         v-if="modalOpen"></div>
    <div class="modal-container"
           v-if="modalOpen">
      <div class="modal card">
        <div class="header">
          <button class="icon-button"
                  v-on:click="closeModal">
            <TimesIcon class="icon" />
          </button>
          <div class="title">Ranking</div>
        </div>
        <div class="body">
          <rank-list></rank-list>
        </div>
      </div>
    </div>
    <div>
      <h1>Twin Words</h1>
      <h2 class="gray-text">How good are you at <br/>distinguishing commonly confused words?</h2>
      <table class="my-score">
        <tr>
          <th>Player</th>
          <td>{{ globalState.user.name || '' }}</td>
        </tr>
        <tr>
          <th>Best Score</th>
          <td>{{ globalState.record.correctNum !== undefined ? globalState.record.correctNum : '' }}</td>
        </tr>
        <tr>
          <th>Rank</th>
          <td>{{ globalState.myRank !== undefined ? globalState.myRank + 1 : '' }}</td>
        </tr>
      </table>
    </div>
  </div>
  <div class="footer">
    <div class="col">
      <router-link to="/quiz"
               class="button">Go&nbsp;
        <ChevronRightIcon class="icon" />
      </router-link>
    </div>
  </div>
</div>

</template>

<script>
import TrophyIcon from '../../asset/trophy.svg';
import TimesIcon from '../../asset/times.svg';
import ChevronRightIcon from '../../asset/chevron-right.svg';

export default {
  name: 'HomePage',
  components: {
    TrophyIcon,
    TimesIcon,
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
h1 {
  font-size: 2.5em;
}

h2 {
  font-size: 1em;
  font-weight: normal;
}

.content {
  padding: 10% 1em 0;
}

.my-score {
  margin-top: 5em;
  width: 100%;
  table-layout: fixed;
  th,
  td {
    padding: 0 .8em;
  }
  th {
    font-weight: normal;
    color: #999;
    text-align: right;
  }
  td {
    text-align: left;
  }
}
</style>
