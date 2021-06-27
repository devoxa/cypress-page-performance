import fs from 'fs'
import { compact, max, sum, roundTo } from 'flocky'

interface SavePagePerformanceMetricsPluginOptions {
  fileName?: string
}

export function addSavePagePerformanceMetricsPlugin(
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions,
  options: SavePagePerformanceMetricsPluginOptions = {}
) {
  const fileName = options.fileName || 'page-performance-metrics.json'

  // Delete the file on startup to prevent stale data
  deleteFileIfExists(fileName)

  on('task', {
    savePagePerformanceMetrics: (options) => savePagePerformanceMetrics({ ...options, fileName }),
  })
}

function deleteFileIfExists(fileName: string) {
  if (fs.existsSync(fileName)) {
    fs.unlinkSync(fileName)
  }
}

interface SavePagePerformanceMetricsOptions {
  fileName: string
  label: string
  performanceEntries: Array<PerformanceEntry>
}

interface PerformanceEntry {
  name: string
  transferSize?: number
  responseEnd?: number
  startTime?: number
  duration?: number
}

function savePagePerformanceMetrics(options: SavePagePerformanceMetricsOptions) {
  const { fileName, label, performanceEntries } = options

  const transferSize = sum(compact(performanceEntries.map((x) => x.transferSize)))
  const resourceLoadFinish = roundTo(max(compact(performanceEntries.map((x) => x.responseEnd))), 2)

  const nextjsHydrationEntry = performanceEntries.find((x) => x.name === 'Next.js-hydration')
  const nextjsHydrationFinish =
    nextjsHydrationEntry && nextjsHydrationEntry.startTime && nextjsHydrationEntry.duration
      ? roundTo(nextjsHydrationEntry.startTime + nextjsHydrationEntry.duration, 2)
      : undefined

  const pagePerformanceMetrics = { label, transferSize, resourceLoadFinish, nextjsHydrationFinish }

  // Push the page performance metrics into the existing array of metrics
  let existing = []
  if (fs.existsSync(fileName)) {
    existing = JSON.parse(fs.readFileSync(fileName, 'utf-8'))
  }
  existing.push(pagePerformanceMetrics)
  fs.writeFileSync(fileName, JSON.stringify(existing, null, 2), 'utf-8')

  // We have to return null here to signal to Cypress that the plugin is done
  return null
}
