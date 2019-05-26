module.exports = {
  genSalt: () => 'salt',
  hash: (a, b) => `${a}_${b}`,
  compare: (a, b) => `${a}_salt` === b
}
