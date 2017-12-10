var noop = function() {}
exports.findOneOrCreate = function(condition) {
  return this.findOne(condition).then(result => {
    if (!result) {
      return this.create(condition)
    }
    return result
  })
}
