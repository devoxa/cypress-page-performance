/* eslint-disable @typescript-eslint/no-namespace */

declare global {
  namespace Cypress {
    interface Chainable {
      /** Save the performance metrics of the current page to disk */
      savePagePerformanceMetrics(label: string): void
    }
  }
}

export function addSavePagePerformanceMetricsCommand() {
  Cypress.Commands.add('savePagePerformanceMetrics', function (label: string) {
    cy.window().then((window) => {
      cy.task('savePagePerformanceMetrics', {
        label,
        performanceEntries: window.performance.getEntries(),
      })
    })
  })
}
