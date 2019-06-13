module.exports = {
  'extends' : 'airbnb-base',
  'env': {
    'browser': true,
  },
  'rules': {
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': ['error', {'devDependencies': ['Gulpfile.js']}]
  },
}
