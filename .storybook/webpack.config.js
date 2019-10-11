const path = require('path')

module.exports = ({ config, mode }) => {
  // `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  // Add Typescript support
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('babel-loader'),
    options: {
      presets: [['react-app', { flow: false, typescript: true }]],
    },
  })
  config.resolve.extensions.push('.ts', '.tsx')

  // Adds the "StorySource" addon to copy source code
  config.module.rules.push({
    test: [/\.stories\.js$/, /index\.js$/],
    loaders: [require.resolve('@storybook/addon-storysource/loader')],
    include: [path.resolve(__dirname, '../src/')],
    enforce: 'pre',
  })

  // Adds absolute paths to imports
  config.resolve.alias = {
    ...config.resolve.alias,
    '@components': path.resolve(__dirname, '../src/components'),
    '@assets': path.resolve(__dirname, '../src/assets'),
    '@helpers': path.resolve(__dirname, '../src/helpers'),
    '@layouts': path.resolve(__dirname, '../src/layouts'),
    '@templates': path.resolve(__dirname, '../src/templates'),
  }

  return config
}
