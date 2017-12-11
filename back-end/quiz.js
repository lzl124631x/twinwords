var twinWords = require('./static/twin-words.json')
var dict = require('./static/dict.json')
var util = require('./util')

var db = createTwinWordDB(twinWords)
var dict = util.reduce(dict, (memo, item) => memo[item.en] = item.cn, {})

module.exports = {
  getQuizzes() {
    var twins = util.reservoirSampling(db, 20)
    return generateQuizzes(twins, dict)
  }
}

function createTwinWordDB(twinWords) {
  var db = []
  for (var word in twinWords) {
    twinWords[word].forEach(neighbor => db.push([word, neighbor]))
  }
  return db
}

function generateQuizzes(twins, dict) {
  return twins.map(twin => {
    var index = util.getRandomInt(0, twin.length)
    var key = twin[index]
    var q = dict[key]
    return {
      q: q,
      options: twin,
      key: key
    }
  })
}
