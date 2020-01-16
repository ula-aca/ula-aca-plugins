/*
 * Copyright 2020-present ula-aca
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
  output,
  comment
}: {
  type: string
  input?: object
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  output?: any
  comment?: string
}): void {
  log(`${inverse('START EVENT:')} ${bold(type)}`)

  emptyLine()

  if (comment) {
    log(indent(bold('Comment: ')))
    log(indent(comment))
    emptyLine()
  }

  if (input) {
    log(indent(bold('Input: ')))
    log(indent(prettyJSON(input)))
  } else {
    log(indent(bold('No input')))
  }

  emptyLine()

  if (output) {
    log(indent(bold(`Output: `)))
    if (typeof output === 'object') {
      log(indent(prettyJSON(output)))
    } else {
      log(indent(String(output)))
    }
  } else {
    log(indent(bold(`No output`)))
  }

  emptyLine()
  log(`${inverse('END EVENT:')} ${bold(type)}`)
  emptyLine()
}

export { logEvent }
