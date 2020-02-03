const { utils } = require('@commitlint/config-lerna-scopes')

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-case': [2, 'always', 'kebab-case'],
    'scope-enum': ctx =>
      utils
        .getPackages(ctx)
        .then(packages => [
          2,
          'always',
          [...packages, 'deps-dev', 'deps', 'aca-webhook-event-models', 'release']
        ])
  }
}
