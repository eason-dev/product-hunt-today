import { Config } from '@remotion/cli/config'
import { webpack } from '@remotion/bundler'

Config.setVideoImageFormat('jpeg')
Config.setOverwriteOutput(true)

// https://www.remotion.dev/docs/webpack#enable-tailwindcss-support
Config.overrideWebpackConfig((currentConfiguration) => {
  return {
    ...currentConfiguration,
    plugins: [
      ...(currentConfiguration.plugins || []),
      new webpack.DefinePlugin({
        'process.env.MIDDAY_POST': JSON.stringify(process.env.MIDDAY_POST),
      }),
    ],
    module: {
      ...currentConfiguration.module,
      rules: [
        ...(currentConfiguration.module?.rules ?? []).filter((rule) => {
          if (rule === '...') {
            return false
          }
          if (typeof rule === 'object' && rule !== null && 'test' in rule) {
            const test = rule.test
            if (test?.toString().includes('.css')) {
              return false
            }
          }
          return true
        }),
        {
          test: /\.css$/i,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    'postcss-preset-env',
                    '@tailwindcss/postcss',
                    'autoprefixer',
                  ],
                },
              },
            },
          ],
        },
      ],
    },
  }
})
