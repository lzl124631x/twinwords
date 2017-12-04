var P = require('bluebird')
var twinWords = require('../static/twin-words.json')
var dict = require('../static/dict.json')

var db = createTwinWordDB(twinWords)
var dict = reformDict(dict)

export default {
  getQuizzes() {
    var twins = reservoirSampling(db, 20)
    var quizzes = generateQuizzes(twins, dict)
    return P.resolve(quizzes)
  }
}

function createTwinWordDB(twinWords) {
  var db = []
  for (var word in twinWords) {
    twinWords[word].forEach(neighbor => db.push([word, neighbor]))
  }
  return db
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function reservoirSampling(db, count) {
  count = Math.min(db.length, count)
  if (count === db.length) return db
  var twins = []
  db.forEach((item, i) => {
    if (i < count) {
      twins.push(item)
    } else {
      var index = getRandomInt(0, i + 1)
      if (index < count) {
        twins[index] = item
      }
    }
  })
  return twins
}

function reformDict(dict) {
  var d = {}
  dict.forEach(item => d[item.en] = item.cn)
  return d
}

function generateQuizzes(twins, dict) {
  return twins.map(twin => {
    var index = getRandomInt(0, 2)
    var key = twin[index]
    var q = dict[key]
    return {
      q: q,
      options: twin,
      key: key
    }
  })
}
