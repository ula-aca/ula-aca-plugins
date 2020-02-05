# Contributing

This repo uses [Lerna](https://lerna.js.org) to manage it as a monorepo and [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) so we can automatically generate a changelog and determine the next semver version for each package.

## Prerequisites

In order to work on this repository the following dependencies are required:

- [Node.js](https://nodejs.org/en/download/) v10
- [Yarn](https://yarnpkg.com/)
-

## Getting Started

The setup only requires you to install Node dependencies. This can be done with

```sh
yarn
```

## Creating a commit

As stated above, this repository uses Conventional Commits for commits. To make it easier to conform to the spec we use the [Commitizen](https://commitizen.github.io/cz-cli/) package that is hooked into `git commit`. This will make sure you create a commit that conforms to the spec.

The commit message guildelines are described in full on the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) website. The [commitlint package](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional) also contains documentation on the specification.

```sh
# Commit your files
# Make sure to not use `-m "message"` to add your message. You will be prompted for this.
git commit
```

## Publishing packages

> TODO
