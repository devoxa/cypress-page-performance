/// <reference types="cypress" />
interface SavePagePerformanceMetricsPluginOptions {
    fileName?: string;
}
export declare function addSavePagePerformanceMetricsPlugin(on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions, options?: SavePagePerformanceMetricsPluginOptions): void;
export {};
