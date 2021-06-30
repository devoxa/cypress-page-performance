/// <reference types="cypress" />
interface SavePagePerformanceMetricsPluginOptions {
    fileName?: string;
}
export declare function addSavePagePerformanceMetricsPlugin(on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions, options?: SavePagePerformanceMetricsPluginOptions): void;
export interface PagePerformanceMetric {
    label: string;
    transferSize: number;
    resourceLoadFinish: number;
    nextjsHydrationFinish?: number;
}
export {};
