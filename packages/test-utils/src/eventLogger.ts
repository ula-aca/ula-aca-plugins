import chalk from 'chalk'
import emphasize from 'emphasize'
import indentString from 'indent-string'

const { log } = console
const prettyJSON = (json: object): string =>
  emphasize.highlight('json', JSON.stringify(json, null, 4)).value
const { inverse } = chalk.bold
const emptyLine = (noOfLines = 1): void =>
  log(Array.from(new Array(noOfLines), () => '\n').join(''))
const indent = (value, noOfSpaces = 4, ...params): string =>
  indentString(value, noOfSpaces, ...params)
const { bold } = chalk

function logEvent({
  type,
  input,
  output
}: {
  type: string
  input?: object
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  output?: any
}): void {
  log(`${inverse('START EVENT:')} ${bold(type)}`)

  emptyLine()

  if (input) {
    log(indent(bold('Input: ')))
    log(indent(prettyJSON(input)))
  } else {
    log(indent(bold('No input')))
  }

  emptyLine()

  log(indent(bold(`Output: `)))
  if (typeof output === 'object') {
    log(indent(prettyJSON(output)))
  } else {
    log(indent(output))
  }

  emptyLine()
  log(`${inverse('END EVENT:')} ${bold(type)}`)
  emptyLine()
}

export { logEvent }
