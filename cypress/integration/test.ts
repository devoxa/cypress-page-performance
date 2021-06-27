describe('cypress-page-performance', () => {
  it('renders the page successfully and saves performance metrics', () => {
    cy.visit('https://www.google.com/')
    cy.savePagePerformanceMetrics('Google')
  })
})
