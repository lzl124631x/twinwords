var db = require('./static/twin-words.json')
var dict = require('./static/dict.json')
var util = require('./util')

var dict = util.reduce(dict, (memo, item) => memo[item.en] = item.cn, {})

// Split db into three chunks, twins, triplets, and others.
var db = util.reduce(db, (memo, neighbor, word) => memo[Math.min(neighbor.length, 3) - 1][word] = neighbor, [{}, {}, {}])

module.exports = {
  getQuizzes() {
    const counts = [7, 7, 7]
    var tuples = []
    counts.forEach((cnt, index) => tuples = tuples.concat(getTuples(db[index], util.reservoirSampling(Object.keys(db[index]), cnt), 2 + index)))
    return generateQuizzes(tuples, dict)
  }
}

function getTuples(db, words, num) {
  return words.map(word => {
    var neighbor = db[word]
    var tuple = util.reservoirSampling(neighbor, num - 1)
    tuple.push(word)
    return tuple
  })
}

function generateQuizzes(tuples, dict) {
  return tuples.map(tuple => {
    shuffle(tuple)
    var index = util.getRandomInt(0, tuple.length)
    var key = tuple[index]
    var q = dict[key]
    return {
      q: q,
      options: tuple,
      key: key
    }
  })
}

function shuffle(array) {
  for (var i = array.length - 1; i > 0; --i) {
    var index = util.getRandomInt(0, i + 1)
    if (index != i) {
      var tmp = array[i]
      array[i] = array[index]
      array[index] = tmp
    }
  }
}
