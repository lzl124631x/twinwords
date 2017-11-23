<template>
<div class="quiz-page">
  <div class="header">
    <ul class="lives">
      <li v-for="life in maxLives"
          class="life" v-bind:class="{ off: life > lives }">❤</li>
    </ul>
  </div>
  <div class="quiz">{{ curQuiz.q }}</div>
  <ul class="options"
      v-bind:class="{ taken: chosen != '' }">
    <li v-for="option in curQuiz.options"
        v-on:click="next(option)"
        class="option button"
        v-bind:class="{ right: option == curQuiz.key, chosen: option == chosen }">
      {{ option }}
    </li>
  </ul>
</div>

</template>

<script>
export default {
  name: 'QuizPage',
  data() {
    return {
      quizzes: [
        {
          q: '狗',
          options: [
            'dog',
            'fog'
          ],
          key: 'dog'
        },
        {
          q: '猪',
          options: [
            'pig',
            'jig'
          ],
          key: 'pig'
        },
        {
          q: '猫',
          options: [
            'cat',
            'kite'
          ],
          key: 'cat'
        },
        {
          q: '兔',
          options: [
            'rabbit',
            'reddit'
          ],
          key: 'rabbit'
        }
      ],
      curQuizIndex: 0,
      maxLives: 3,
      lives: 3,
      chosen: ''
    }
  },
  computed: {
    curQuiz() {
      return this.quizzes[this.curQuizIndex]
    }
  },
  methods: {
    next(option) {
      this.chosen = option
      var wrong = (this.curQuiz.key !== option)
      if (wrong) {
        this.lives--
      }
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
      }, 800)

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
  padding: 1em;
  font-size: 2em;
  font-weight: bold;
}

.options {
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
