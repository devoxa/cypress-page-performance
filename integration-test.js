const fs = require('fs')

const json = JSON.parse(fs.readFileSync('./page-performance-metrics.json', 'utf-8'))
const pagePerformanceMetric = json[0]

if (pagePerformanceMetric.label !== 'Google') {
  console.log('label does not match expected')
  process.exit(1)
}

if (
  typeof pagePerformanceMetric.encodedBodySize !== 'number' ||
  pagePerformanceMetric.encodedBodySize < 32000 ||
  pagePerformanceMetric.encodedBodySize > 1000000
) {
  console.log('encodedBodySize does not match expected')
  process.exit(1)
}

if (
  typeof pagePerformanceMetric.resourceLoadFinish !== 'number' ||
  pagePerformanceMetric.resourceLoadFinish < 50 ||
  pagePerformanceMetric.resourceLoadFinish > 10000
) {
  console.log('resourceLoadFinish does not match expected')
  process.exit(1)
}

console.log('Page performance metric looks as expected')
process.exit(0)
