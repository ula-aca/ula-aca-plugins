// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
module.exports = (config) => {
  config.set({
    mutator: 'typescript',
    packageManager: 'yarn',
    reporters: ['html', 'clear-text', 'progress', 'dashboard'],
    testRunner: 'mocha',
    mochaOptions: {
      config: '.mocharc.json',
      spec: ['packages/**/tests/**/*.spec.ts']
    },
    tsconfigFile: 'config/tsconfig.test.json',
    mutate: ['packages/**/src/**/*.ts'],
    thresholds: {
      high: 100,
      low: 90,
      break: null
    }
  })
}
