import { addSavePagePerformanceMetricsPlugin } from '../../plugin'

export default (on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) => {
  addSavePagePerformanceMetricsPlugin(on, config)
  return config
}
