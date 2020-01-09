# Universal Ledger Agent - Aries Cloudagent Plugins

[![Continuous Integration Badge](https://github.com/ula-aca/ula-aca-plugins/workflows/Continuous%20Integration/badge.svg)](https://github.com/ula-aca/ula-aca-plugins/actions?query=workflow%3A%22Continuous+Integration%22)
[![Maintainability](https://api.codeclimate.com/v1/badges/29e796f6dd07eb75eb37/maintainability)](https://codeclimate.com/github/ula-aca/ula-aca-plugins/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/29e796f6dd07eb75eb37/test_coverage)](https://codeclimate.com/github/ula-aca/ula-aca-plugins/test_coverage)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![GitHub license](https://img.shields.io/github/license/ula-aca/ula-aca-plugins.svg)](https://github.com/ula-aca/ula-aca-plugins/blob/master/LICENSE)
[![GitHub release](https://img.shields.io/github/release/ula-aca/ula-aca-plugins.svg)](https://GitHub.com/ula-aca/ula-aca-plugins/releases/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

> Aries Cloudagent plugins for the Universal Ledger Agent

- [Universal Ledger Agent - Aries Cloudagent Plugins](#universal-ledger-agent---aries-cloudagent-plugins)
  - [Usage](#usage)
  - [Packages](#packages)
  - [Contributing](#contributing)
  - [Running tests](#running-tests)
  - [License and disclaimer](#license-and-disclaimer)

## Usage

This repository uses [Lerna](https://lerna.js.org) to manage multiple NPM packages in one repository. To find usage information about one of the packages contained in this repository you should check the readme for that specific package. See the [Packages](#packages) entry in this file to see information about the packages in this repository.

## Packages

All packages are placed in the [`packages/`](./packages) directory.

| Package                                                                                                    | Path                                                                             | Description                                                                                                |
| ---------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| [`@ula-aca/connection`](https://www.npmjs.com/package/@ula-aca/connection)                                 | [`./packages/connection`](./packages/connection)                                 | Universal Ledger Agent plugin for creating and maintaining Aries Cloudagent connections with other agents. |
| [`@ula-aca/present-proof`](https://www.npmjs.com/package/@ula-aca/present-proof)                           | [`./packages/present-proof`](./packages/present-proof)                           |                                                                                                            |
| [`@ula-aca/schema`](https://www.npmjs.com/package/@ula-aca/schema)                                         | [`./packages/schema`](./packages/schema)                                         |                                                                                                            |
| [`@ula-aca/ledger`](https://www.npmjs.com/package/@ula-aca/ledger)                                         | [`./packages/ledger`](./packages/ledger)                                         |                                                                                                            |
| [`@ula-aca/webhook-relay-event-router`](https://www.npmjs.com/package/@ula-aca/webhook-relay-event-router) | [`./packages/webhook-relay-event-router`](./packages/webhook-relay-event-router) |                                                                                                            |

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for more information.

## Running tests

> TODO

```bash
npm run test
```

## License and disclaimer

[apache-2.0](https://choosealicense.com/licenses/apache-2.0/) with a [notice](NOTICE).

We discourage the use of this work in production environments as it is in active development and not mature enough.
