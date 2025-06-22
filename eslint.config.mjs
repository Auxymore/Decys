import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  {
    ignores: ['**/node_modules/', '**/public/', '**/.next/'],
  },
  ...compat.extends('next/core-web-vitals', 'next/typescript', 'plugin:tailwindcss/recommended'),

  {
    settings: {
      tailwindcss: {
        callees: ['cn', 'cva'],
        config: 'tailwind.config.ts',
      },

      next: {
        rootDir: true,
      },
    },

    rules: {
      'import/no-anonymous-default-export': [
        'error',
        {
          allowArray: false,
          allowArrowFunction: false,
          allowAnonymousClass: false,
          allowAnonymousFunction: false,
          allowCallExpression: true,
          allowNew: false,
          allowLiteral: false,
          allowObject: true,
        },
      ],

      'no-restricted-syntax': [
        'error',
        {
          selector: 'TSEnumDeclaration',
          message:
            "Don't declare enums (https://lumin8media.com/blog/should-we-use-typescript-enums).",
        },
      ],
      'tailwindcss/classnames-order': 'error',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',

      'tailwindcss/no-custom-classname': ['off'],
    },
  },
  {
    files: ['*.ts', '*.tsx', '*.js'],
    languageOptions: {
      parser: '@typescript-eslint/parser',
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    // languageOptions can be uncommented and configured if needed
    // languageOptions: {
    //   parser: tsParser,
    // },
  },
]

export default eslintConfig
