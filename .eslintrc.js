const { relative } = require('path')
const {spawnSync} = require('child_process')

const lernaPackages = spawnSync('lerna', ["ls", "--all", "--parseable"]).stdout.toString().trim().split("\n")
const noExtraneousOverrides = lernaPackages
  .reduce((overrides, entry) => {
    const relPath = relative(process.cwd(), entry)
    return [...overrides, {
    // Main rule. Only allow packages declared under `dependencies` in package.json of package
    files: [`${relPath}/**/*`],
    rules: {
			'import/no-extraneous-dependencies': [
				'error',
				{
					devDependencies: false,
					optionalDependencies: false,
					packageDir: [entry],
				},
			],
		},
  },
  {
    // Allow packages declared under `dependencies` and `devDependencies` in package.json of package and root
    files: [`${relPath}/examples/**`, `${relPath}/tests/**/*`],
    rules: {
			'import/no-extraneous-dependencies': [
				'error',
				{
					devDependencies: true,
					optionalDependencies: false,
					packageDir: [__dirname, entry],
				},
			],
		},
  }] 
}, [])

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
        'no-console': 'off',
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
    {
      files: './examples/**',
      rules: {
        'import/no-extraneous-dependencies': [
          'error',
          {
            devDependencies: true,
            optionalDependencies: false,
            peerDependencies: false,
          },
        ],
      }
    },
    ...noExtraneousOverrides
  ]
}
