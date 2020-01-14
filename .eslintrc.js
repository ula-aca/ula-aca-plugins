const { resolve } = require('path');
const { readdirSync, lstatSync } = require('fs');

const PACKAGE_DIR = 'packages/'; // this could be replaced utilizing the globs in package.json's "workpackges" or from the lerna.json config

// get files in packages
const noExtraneousOverrides = readdirSync(resolve(__dirname, PACKAGE_DIR))
	// filter for non-hidden dirs to get a list of packages
	.filter(
		entry =>
			entry.substr(0, 1) !== '.' && lstatSync(resolve(__dirname, PACKAGE_DIR, entry)).isDirectory(),
	)
	// map to override rules pointing to local and root package.json for rule
	.map(entry => ({
		files: [`${PACKAGE_DIR}${entry}/**/*`],
		rules: {
			'import/no-extraneous-dependencies': [
				'error',
				{
					devDependencies: true,
					optionalDependencies: false,
					peerDependencies: false,
					packageDir: [__dirname, resolve(__dirname, PACKAGE_DIR, entry)],
				},
			],
		},
  }));
  
module.exports = {
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.test.json'
  },
  rules: {
    'import/prefer-default-export': 'off',
    'class-methods-use-this': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        ts: 'never'
      }
    ],
    '@typescript-eslint/camelcase': 'off',
    'default-case': 'off',
    'no-restricted-imports': ["error", {
      patterns: ["../lib/*", "*/../lib/*", "packages/*/lib/*", "./lib/*"]
    }]
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts']
      },
      typescript: {}
    }
  },
  overrides: [
    {
      files: '**/examples/**',
      rules: {
        'no-console': 'off'
      }
    },
    {
      // we should focus on writing tests, not making eslint work
      files: '*.spec.ts',
      rules: {
        'no-unused-expressions': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        'no-await-in-loop': 'off',
        'no-restricted-syntax': 'off'
      }
    },
    ...noExtraneousOverrides
  ]
}
