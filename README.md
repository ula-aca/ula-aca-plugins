# Universal Ledger Agent - Aries Cloudagent Plugins

[![Continuous Integration Badge](https://github.com/ula-aca/ula-aca-plugins/workflows/Continuous%20Integration/badge.svg)](https://github.com/ula-aca/ula-aca-plugins/actions?query=workflow%3A%22Continuous+Integration%22)
[![Maintainability](https://api.codeclimate.com/v1/badges/29e796f6dd07eb75eb37/maintainability)](https://codeclimate.com/github/ula-aca/ula-aca-plugins/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/29e796f6dd07eb75eb37/test_coverage)](https://codeclimate.com/github/ula-aca/ula-aca-plugins/test_coverage)
[![Mutation testing badge](https://img.shields.io/endpoint?style=flat&url=https%3A%2F%2Fbadge-api.stryker-mutator.io%2Fgithub.com%2Fula-aca%2Fula-aca-plugins%2Fmaster)](https://dashboard.stryker-mutator.io/reports/github.com/ula-aca/ula-aca-plugins/master)
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
    - [Unit tests](#unit-tests)
    - [Integration tests](#integration-tests)
  - [License and disclaimer](#license-and-disclaimer)

## Usage

This repository uses [Lerna](https://lerna.js.org) to manage multiple NPM packages in one repository. To find usage information about one of the packages contained in this repository you should check the readme for that specific package. See the [Packages](#packages) entry in this file to see information about the packages in this repository.

## Packages

All packages are placed in the [`packages/`](./packages) directory.

| Package                                                                                                    | Path                                                                             | Description                                                                                                     |
| ---------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| [`@ula-aca/connection`](https://www.npmjs.com/package/@ula-aca/connection)                                 | [`./packages/connection`](./packages/connection)                                 | Universal Ledger Agent plugin for creating and maintaining Aries Cloudagent connections with other agents       |
| [`@ula-aca/present-proof`](https://www.npmjs.com/package/@ula-aca/present-proof)                           | [`./packages/present-proof`](./packages/present-proof)                           |                                                                                                                 |
| [`@ula-aca/schema`](https://www.npmjs.com/package/@ula-aca/schema)                                         | [`./packages/schema`](./packages/schema)                                         | Universal Ledger Agent plugin for creating and retrieving schemas from the ledger connected to Aries Cloudagent |
| [`@ula-aca/ledger`](https://www.npmjs.com/package/@ula-aca/ledger)                                         | [`./packages/ledger`](./packages/ledger)                                         |                                                                                                                 |
| [`@ula-aca/credential-definition`](https://www.npmjs.com/package/@ula-aca/credential-definition)           | [`./packages/credential-definition`](./packages/credential-definition)           |                                                                                                                 |
| [`@ula-aca/issue-credential`](https://www.npmjs.com/package/@ula-aca/issue-credential)                     | [`./packages/issue-credential`](./packages/issue-credential)                     |                                                                                                                 |
| [`@ula-aca/wallet`](https://www.npmjs.com/package/@ula-aca/wallet)                                         | [`./packages/wallet`](./packages/wallet)                                         | Universal Ledger Agent plugin for managing the wallet in Aries Cloudagent                                       |
| [`@ula-aca/credential`](https://www.npmjs.com/package/@ula-aca/credential)                                 | [`./packages/credential`](./packages/credential)                                 | Universal Ledger Agent plugin for retrieving and removing Aries Cloudagent credentials issued to you            |
| [`@ula-aca/webhook-relay-event-router`](https://www.npmjs.com/package/@ula-aca/webhook-relay-event-router) | [`./packages/webhook-relay-event-router`](./packages/webhook-relay-event-router) |                                                                                                                 |
| [`@ula-aca/webhook-event-models`](https://www.npmjs.com/package/@ula-aca/webhook-event-models)             | [`./packages/webhook-event-models`](./packages/webhook-event-models)             |                                                                                                                 |

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for more information.

## Running tests

### Unit tests

Besides unit testing with Mocha, the effectivity of all tests are also measured with the Stryker mutation testing framework.

```bash
npm run test:unit
npm run test:stryker
```

We aim to achieve a coverage of 100%. Mocha test scores below 80% will fail the build. Stryker test scores do not have a threshold at the moment, but is planned to also fail below 80% in the future.

### Integration tests

> TODO: Add setup instructions for von-network, aca-py and aca-whr. For now see the [Github Action](./.github/workflows/continuous_integration.yml) in combination with [`./network-setup`](./network-setup)

Integration tests are run against a real Aries Cloudagent.

```bash
npm run test:integration
```

## License and disclaimer

[apache-2.0](https://choosealicense.com/licenses/apache-2.0/) with a [notice](NOTICE).

We discourage the use of this work in production environments as it is in active development and not mature enough.
