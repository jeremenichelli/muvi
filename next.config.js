require('dotenv').config()
const withPlugins = require('next-compose-plugins')
const withPreact = require('next-plugin-preact')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

const env = {
  API_KEY: process.env.API_KEY
}

module.exports = withPlugins([
  // plugins
  withPreact,
  withBundleAnalyzer,
  // custom Next configuration
  {
    env
  }
])
