<!-- Title -->
<h1 align="center">
  cypress-page-performance
</h1>

<!-- Description -->
<h4 align="center">
  Save page performance metrics to disk during Cypress runs.
</h4>

<!-- Badges -->
<p align="center">
  <a href="https://www.npmjs.com/package/@devoxa/cypress-page-performance">
    <img
      src="https://img.shields.io/npm/v/@devoxa/cypress-page-performance?style=flat-square"
      alt="Package Version"
    />
  </a>

  <a href="https://github.com/devoxa/cypress-page-performance/actions?query=branch%3Amaster+workflow%3A%22Continuous+Integration%22">
    <img
      src="https://img.shields.io/github/workflow/status/devoxa/cypress-page-performance/Continuous%20Integration?style=flat-square"
      alt="Build Status"
    />
  </a>
</p>

<!-- Quicklinks -->
<p align="center">
  <a href="#installation">Installation</a> •
  <a href="#usage">Usage</a> •
  <a href="#contributors">Contributors</a> •
  <a href="#license">License</a>
</p>

<br>

## Installation

1. Install the package

```bash
yarn add --dev @devoxa/cypress-page-performance
```

2. Import the command in `cypress/support/commands.ts`:

```ts
import { addSavePagePerformanceMetricsCommand } from '@devoxa/cypress-page-performance/command'
addSavePagePerformanceMetricsCommand()
```

3. Import the plugin in `cypress/plugins/index.ts`:

```ts
import { addSavePagePerformanceMetricsPlugin } from '@devoxa/cypress-page-performance/plugin'

export default (on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) => {
  addSavePagePerformanceMetricsPlugin(on, config)

  // You can also optionally add an additional options object:
  // addSavePagePerformanceMetricsPlugin(on, config, options)

  return config
}
```

Additional available options:

- `fileName`: The name of the file that the page performance metrics are saved into, defaults to
  `page-performance-metrics.json`

## Usage

```ts
describe('SignInPage', () => {
  it('renders the page successfully', () => {
    cy.visit('/sign-in')

    cy.savePagePerformanceMetrics('SignInPage')
  })
})
```

After running Cypress, the plugin will output a JSON file with an array of page performance entries
in the root directory.

```json
[
  {
    "label": "SignInPage",
    "transferSize": 205048,
    "resourceLoadFinish": 156.32,
    "nextjsHydrationFinish": 137.64
  }
]
```

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://www.david-reess.de"><img src="https://avatars3.githubusercontent.com/u/4615516?v=4" width="75px;" alt=""/><br /><sub><b>David Reeß</b></sub></a><br /><a href="https://github.com/devoxa/cypress-page-performance/commits?author=queicherius" title="Code">💻</a> <a href="https://github.com/devoxa/cypress-page-performance/commits?author=queicherius" title="Documentation">📖</a> <a href="https://github.com/devoxa/cypress-page-performance/commits?author=queicherius" title="Tests">⚠️</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors)
specification. Contributions of any kind welcome!

## License

MIT
