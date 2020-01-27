const globalExamples = ['alice', 'faber', 'acme']
const packageExamples = [
  'connection',
  'ledger',
  'schema',
  'credential-definition',
  'credential'
]

const command = process.argv[2]

// eslint-disable-next-line import/no-dynamic-require,global-require
if (globalExamples.includes(command)) require(`./${command}/run.ts`)
else if (packageExamples.includes(command))
  // eslint-disable-next-line import/no-dynamic-require,global-require
  require(`packages/${command}/examples/run.ts`)
else
  console.error(
    `No example available for "${command}"\n\nAvailable examples:\n  - ${[
      ...globalExamples,
      ...packageExamples
    ].join('\n  - ')}`
  )
