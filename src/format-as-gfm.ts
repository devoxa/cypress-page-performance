#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import yargs from 'yargs/yargs'
import { hideBin } from 'yargs/helpers'
import { PagePerformanceMetric } from './plugin'

const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8'))

const argv = yargs(hideBin(process.argv))
  .version(packageJson.version)
  .option('filename', {
    type: 'string',
    description: 'The file name for the JSON page performance metrics',
    default: './page-performance-metrics.json',
  })
  .parseSync()

run(argv.filename)

function run(fileName: string) {
  const json = JSON.parse(fs.readFileSync(fileName, 'utf-8'))

  const pagePerformanceMetrics = json as Array<PagePerformanceMetric>
  pagePerformanceMetrics.sort((a, b) => a.label.localeCompare(b.label))

  const rows = [
    '| Page | Transfer size | Resource load time | Next.js hydration time |',
    '| ---- | ------------- | ------------------ | ---------------------- |',
  ]

  for (const line of pagePerformanceMetrics) {
    const columns = [
      line.label,
      asKb(line.transferSize),
      asMs(line.resourceLoadFinish),
      asMs(line.nextjsHydrationFinish),
    ]

    rows.push(`| ${columns.join(' | ')} |`)
  }

  console.log(rows.join('\n').replace(/\n/g, '%0A'))
}

function asKb(value: number) {
  if (!value) return '-'

  value = Math.round(value / 10) / 100

  if (value < 300) {
    return `🟩 ${value.toFixed(2)} kB`
  }

  return `🟥 ${value.toFixed(2)} kB`
}

function asMs(value: number | undefined) {
  if (!value) return '-'

  value = Math.round(value)

  if (value < 1000) {
    return `🟩 ${value} ms`
  }

  return `🟥 ${value} ms`
}
