<template>
<div class="page"
     v-if="quizzes">
  <div class="header">
    <ul class="lives">
      <li v-for="life in maxLives"
          class="life"
          v-bind:class="{ off: life > lives }">❤</li>
    </ul>
  </div>
  <div class="quiz content conteng-hv-center">{{ curQuiz.q }}</div>
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
  <div class="msg">LOADING</div>
</div>

</template>

<script>
import service from '../service';
export default {
  name: 'QuizPage',
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
          this.$router.push({
            name: 'result'
          })
        } else {
          this.curQuizIndex++
        }
      }, 500)
    }
  }
}

</script>

<style scoped="" lang="less">
ul {
  list-style: none;
}

.header {
  text-align: left;
  .lives {
    display: inline-block;
    .life {
      display: inline-block;
      color: #f05458;
      font-size: 1.3em;
      margin: .3em;
      &.off {
        color: #333;
      }
    }
  }
}

.quiz {
  padding: 2em 1em 1em;
  font-size: 3em;
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
