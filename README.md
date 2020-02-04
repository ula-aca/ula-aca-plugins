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

This repository contains plugins to integrate Hyperledger Aries into the Universal Ledger Agent (ULA). The ULA is primarily meant for managing Self Sovereign Identity data. If you don't know what the ULA is check it out on the [repository](https://github.com/rabobank-blockchain/universal-ledger-agent).

- [Universal Ledger Agent - Aries Cloudagent Plugins](#universal-ledger-agent---aries-cloudagent-plugins)
  - [Usage](#usage)
  - [Packages](#packages)
  - [Contributing](#contributing)
  - [Setting up Environment](#setting-up-environment)
  - [Running tests](#running-tests)
    - [Unit tests](#unit-tests)
    - [Integration tests](#integration-tests)
  - [Running Examples](#running-examples)
    - [Single Plugin Examples](#single-plugin-examples)
    - [Full Example](#full-example)
  - [Note](#note)
  - [License and disclaimer](#license-and-disclaimer)

## Usage

This repository uses [Lerna](https://lerna.js.org) to manage multiple NPM packages in one repository. To find usage information about one of the packages contained in this repository you should check the readme for that specific package. See the [Packages](#packages) entry in this file to see information about the packages in this repository.

> Almost all packages in this repo use `@ula-aca/aries-cloudagent-interface`. This packages provides an API to Aries Cloud Agent Python. This API is generated using the OpenAPI Schema (Swagger) from Aries Cloud Agent Python. However this schema is not representing the real API. A lot of types are not correct. Keep this in mind when using this package. Please open issues or pull requests with patches in the [ula-aca/aries-cloudagent-interface-javascript](https://github.com/ula-aca/aries-cloudagent-interface-javascript) repository when you find them.

## Packages

All packages are placed in the [`packages/`](./packages) directory.

| Package                                                                                                    | Path                                                                             | Description                                                                                                                                                                           |
| ---------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@ula-aca/connection`](https://www.npmjs.com/package/@ula-aca/connection)                                 | [`./packages/connection`](./packages/connection)                                 | Universal Ledger Agent plugin for creating and maintaining Aries Cloudagent connections with other agents                                                                             |
| [`@ula-aca/present-proof`](https://www.npmjs.com/package/@ula-aca/present-proof)                           | [`./packages/present-proof`](./packages/present-proof)                           | Universal Ledger Agent plugin for creating and receiving Aries Cloudagent Verifiable Presentations                                                                                    |
| [`@ula-aca/schema`](https://www.npmjs.com/package/@ula-aca/schema)                                         | [`./packages/schema`](./packages/schema)                                         | Universal Ledger Agent plugin for creating and retrieving schemas from the ledger connected to Aries Cloudagent                                                                       |
| [`@ula-aca/ledger`](https://www.npmjs.com/package/@ula-aca/ledger)                                         | [`./packages/ledger`](./packages/ledger)                                         | Universal Ledger Agent plugin for performing ledger actions on the Aries Cloudagent                                                                                                   |
| [`@ula-aca/credential-definition`](https://www.npmjs.com/package/@ula-aca/credential-definition)           | [`./packages/credential-definition`](./packages/credential-definition)           | Universal Ledger Agent plugin for creating and retrieving credential definitions from the ledger connected to Aries Cloudagent                                                        |
| [`@ula-aca/issue-credential`](https://www.npmjs.com/package/@ula-aca/issue-credential)                     | [`./packages/issue-credential`](./packages/issue-credential)                     | Universal Ledger Agent plugin for creating and receiving Aries Cloudagent Verifiable Credentials                                                                                      |
| [`@ula-aca/wallet`](https://www.npmjs.com/package/@ula-aca/wallet)                                         | [`./packages/wallet`](./packages/wallet)                                         | Universal Ledger Agent plugin for managing the wallet in Aries Cloudagent                                                                                                             |
| [`@ula-aca/credential`](https://www.npmjs.com/package/@ula-aca/credential)                                 | [`./packages/credential`](./packages/credential)                                 | Universal Ledger Agent plugin for retrieving and removing Aries Cloudagent credentials issued to you                                                                                  |
| [`@ula-aca/webhook-relay-event-router`](https://www.npmjs.com/package/@ula-aca/webhook-relay-event-router) | [`./packages/webhook-relay-event-router`](./packages/webhook-relay-event-router) | Universal Ledger Agent Plugin for receiving [Aries Cloudagent Webhook Relay](https://github.com/ula-aca/aries-cloudagent-webhook-relay) webhook events through a WebSocket connection |
| [`@ula-aca/webhook-event-models`](https://www.npmjs.com/package/@ula-aca/webhook-event-models)             | [`./packages/webhook-event-models`](./packages/webhook-event-models)             | Helper package with base models for creating plugins that interact with Aries Cloudagent webhook events                                                                               |
| [`@ula-aca/core`](https://www.npmjs.com/package/@ula-aca/core)                                             | [`./packages/core`](./packages/core)                                             | Core module of ula-aca that contains code used by all plugins. Base plugin, error handling, etc...                                                                                    |

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for more information.

## Setting up Environment

1. Set up VON Network

You need to run a Hyperledger Indy Node Network. The easiest way to do this is with the [VON Network from BCGov](https://github.com/bcgov/von-network).

See [Running the Network Locally](https://github.com/bcgov/von-network#running-the-network-locally) in the repo for up to date setup. Make sure [Docker](https://hub.docker.com/search?type=edition&offering=community) is installed and running.

```bash
git clone https://github.com/bcgov/von-network.git
cd von-network
./manage build
./manage start
```

2. Start Aries Cloud Agent with Webhook Relay

```bash
git clone https://github.com/ula-aca/ula-aca-plugins.git
cd ula-aca-plugins
docker-compose -f network-setup/docker-compose.yml up -d
```

3. Install NPM Dependencies

```bash
# inside ula-aca-plugins
npx lerna bootstrap
```

4. Set up `.env` file

`.env.example` contains the correct setup for the docker-compose setup in the `network-setup` folder. `.env` will be automatically picked up by integration tests and examples.

```bash
cp .env.example .env
```

|           | HOST                   | DESCRIPTION         |
| --------- | ---------------------- | ------------------- |
| **Faber** | http://localhost:7002  | ACA-Py + Swagger UI |
|           | ws://localhost:7080/ws | Webhook Relay       |
| **Alice** | http://localhost:8002  | ACA-Py + Swagger UI |
|           | ws://localhost:8080/ws | Webhook Relay       |
| **ACME**  | http://localhost:6002  | ACA-Py + Swagger UI |
|           | ws://localhost:6080/ws | Webhook Relay       |

## Running tests

### Unit tests

Besides unit testing with Mocha, the effectivity of all tests are also measured with the Stryker mutation testing framework.

Make sure the NPM dependencies are installed. VON Network, ACA-Py and `.env` setup are not needed for unit tests.

```bash
npm run test:unit
npm run test:stryker
```

We aim to achieve a coverage of 100%. Mocha test scores below 80% will fail the build. Stryker test scores do not have a threshold at the moment, but is planned to also fail below 80% in the future.

### Integration tests

Integration tests are run against a real Aries Cloudagent. Make sure your environment is set up with [Setting up Environment](#setting-up-environment).

```bash
npm run test:integration
```

## Running Examples

Examples are run against a real Aries Cloudagent. Make sure your environment is set up with [Setting up Environment](#setting-up-environment).

### Single Plugin Examples

There are examples that demonstrate the working of a single plugin. These are available for `ledger`, `schema`, `credential-definition`, `credential` and `wallet`. Not all will work out of the box because previous interactions are needed.

You can run them with:

```bash
npm run example <ExampleName>

# e.g.
npm run example schema # works out of the box
```

### Full Example

There is a full example available covering the Issuing and Holding and Proving between three parties. Faber College issues a college degree credential to Alice. Alice then proves to ACME Corp. that she possesses a college degree.

> NOTE: The asciicasts are not in sync and sped up.

1. Run Faber example and copy the created invitation

```bash
npm run example faber
```

[![asciicast](https://asciinema.org/a/mQyu1lj1gNPgTkqY0yGh3V1zX.png)](https://asciinema.org/a/mQyu1lj1gNPgTkqY0yGh3V1zX)

1. Run Alice example and paste copied invitation from Faber. After Alice connects with Faber and received a credential, Alice will create a new invitation. Copy this invitation.

```bash
npm run example alice
```

[![asciicast](https://asciinema.org/a/YiOrsSuywfHJXEIvOLtqIe9ji.png)](https://asciinema.org/a/YiOrsSuywfHJXEIvOLtqIe9ji)

1. Run ACME example and paste copied invitation from Alice. It should en with the event `START: Presentation received`.

```bash
npm run example acme
```

[![asciicast](https://asciinema.org/a/X4tHQMJGbqZzNeOvsBD8NNw2I.png)](https://asciinema.org/a/X4tHQMJGbqZzNeOvsBD8NNw2I)

## Note

This project was created in the context of a blockchain minor at the HU University of Applied Sciences Utrecht under guidance from Rabobank. The report `Creating Hyperledger Aries Plugins for The Universal Ledger Agent` describes why we chose to use Aries Cloud Agent - Python. You can read it [here](./creating-hyperledger-aries-plugins-for-the-universal-ledger-agent-karim-stekelenburg-timo-glastra.pdf)

## License and disclaimer

[apache-2.0](https://choosealicense.com/licenses/apache-2.0/) with a [notice](NOTICE).

We discourage the use of this work in production environments as it is in active development and not mature enough.
