# Universal Ledger Agent - Aries Cloudagent Plugins

[![Continuous Integration Badge](https://github.com/ula-aca/ula-aca-plugins/workflows/Continuous%20Integration/badge.svg)](https://github.com/ula-aca/ula-aca-plugins/actions?query=workflow%3A%22Continuous+Integration%22)
[![Maintainability](https://api.codeclimate.com/v1/badges/29e796f6dd07eb75eb37/maintainability)](https://codeclimate.com/github/ula-aca/ula-aca-plugins/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/29e796f6dd07eb75eb37/test_coverage)](https://codeclimate.com/github/ula-aca/ula-aca-plugins/test_coverage)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

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

| Package                                                                      | Path                                               | Description                                                                                                |
| ---------------------------------------------------------------------------- | -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| [`@ula-aca/connections`](https://www.npmjs.com/package/@ula-aca/connections) | [`./packages/connections`](./packages/connections) | Universal Ledger Agent plugin for creating and maintaining Aries Cloudagent connections with other agents. |

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
