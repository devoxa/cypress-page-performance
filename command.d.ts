declare global {
    namespace Cypress {
        interface Chainable {
            savePagePerformanceMetrics(label: string): void;
        }
    }
}
export declare function addSavePagePerformanceMetricsCommand(): void;
