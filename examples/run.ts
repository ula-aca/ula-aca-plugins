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

const globalExamples = ['alice', 'faber', 'acme']
const packageExamples = [
  'ledger',
  'schema',
  'credential-definition',
  'credential',
  'wallet'
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
