 var noop = function() {}
module.exports = {
  findOneOrCreate(condition) {
    return this.findOne(condition).then(result => {
      if (!result) {
        return this.create(condition)
      }
      return result
    })
  },
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  },
  reservoirSampling(db, count) {
    count = Math.min(db.length, count)
    if (count === db.length) return this.cloneArray(db)
    var samples = []
    db.forEach((item, i) => {
      if (i < count) {
        samples.push(item)
      } else {
        var index = this.getRandomInt(0, i + 1)
        if (index < count) {
          samples[index] = item
        }
      }
    })
    return samples
  },
  reduce(target, fn, memo) {
    if (Array.isArray(target)) {
      target.forEach(item => fn(memo, item))
    } else {// For Object
      Object.keys(target).forEach(key => fn(memo, target[key], key))
    }
    return memo
  },
  cloneArray(array) {
    return array.slice(0)
  }
}
