<template>
<div class="page"
     v-if="quizzes">
  <div class="header">
    <button class="icon-button"
            v-on:click="quit">
      <TimesIcon class="icon" />
    </button>
    <div class="lives content-hv-center">
      <HeartIcon class="icon icon-heart"
                 v-for="life in maxLives"
                 v-bind:class="{ off: life > lives }" />
    </div>
  </div>
  <div class="content conteng-hv-center">
    <div class="quiz-progress">{{ `${curQuizIndex + 1} / ${quizzes.length}`}}</div>
    <div class="quiz">{{ curQuiz.q }}</div>
  </div>
  <ul class="options footer"
      v-bind:class="{ taken: chosen != '' }">
    <li v-for="option in curQuiz.options"
        v-on:click="next(option)"
        class="option button"
        v-bind:class="{ right: option == curQuiz.key, chosen: option == chosen }">
      {{ option }}
    </li>
  </ul>
</div>
<div class="page content-hv-center"
     v-else>
  <div class="gray-text">LOADING</div>
</div>

</template>

<script>
import service from '../service';
import TimesIcon from '../../asset/times.svg';
import HeartIcon from '../../asset/heart.svg';

export default {
  name: 'QuizPage',
  components: {
    TimesIcon,
    HeartIcon
  },
  data() {
    return {
      quizzes: null,
      curQuizIndex: 0,
      maxLives: 3,
      lives: 3,
      chosen: ''
    }
  },
  computed: {
    curQuiz() {
      if (!this.quizzes) {
        return null
      }
      return this.quizzes[this.curQuizIndex]
    }
  },
  mounted() {
    store.reset()
    var self = this
    service.getQuizzes().then(quizzes => self.quizzes = quizzes)
  },
  methods: {
    next(option) {
      this.chosen = option
      var wrong = (this.curQuiz.key !== option)
      if (wrong) {
        this.lives--
      }
      store.pushHistory(this.curQuiz.q, this.curQuiz.key, !wrong)
      setTimeout(() => {
        this.chosen = ''
        if ((wrong && this.lives === 0)
          || this.curQuizIndex + 1 === this.quizzes.length) {
          service.uploadRecord({
            correctNum: store.state.correctNum
          })
            .then(() => {
              service.ranking().then(ranking => store.updateRanking(ranking))
            })
          if (store.state.correctNum > store.state.record.correctNum) {
            store.updateBestRecord({
              correctNum: store.state.correctNum
            })
          }
          this.$router.push({
            name: 'result'
          })
        } else {
          this.curQuizIndex++
        }
      }, 500)
    },
    quit() {
      this.$router.go(-1)
    }
  }
}

</script>

<style scoped="" lang="less">
.header {
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: .3em .5em;
  .lives {
    float: right;
    .icon.icon-heart {
      fill: #f05458;
      margin: .3em;
      &.off {
        fill: #333;
      }
    }
  }
}

.content {
  padding: 2em 1em 1em;
}

.quiz-progress {
  text-align: center;
  font-size: .6em;
  color: #999;
  margin-bottom: 1em;
}

.quiz {
  font-size: 1.2em;
  font-weight: bold;
}

.options.footer {
  display: block;
  .option {
    display: block;
    margin: 1em;
  }
  &.taken {
    pointer-events: none;
    .option {
      &.right {
        background-color: #81d468;
        border-color: #81d468;
        color: #333;
        font-weight: bold;
      }
      &.chosen:not(.right) {
        background-color: #f05458;
        border-color: #f05458;
        font-weight: bold;
      }
    }
  }
}
</style>
