/**
 * Webpack configuration for production bundle optimization
 * Additional compression and tree-shaking for web builds
 */

const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  
  return {
    entry: './index.js',
    
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {
                  targets: {
                    browsers: ['> 1%', 'last 2 versions'],
                  },
                  modules: false, // Enable tree-shaking
                  useBuiltIns: 'usage',
                  corejs: 3,
                }],
                '@babel/preset-react',
                '@babel/preset-typescript',
              ],
              plugins: [
                // Remove unused imports
                ['babel-plugin-transform-remove-console', {
                  exclude: isProduction ? [] : ['error', 'warn'],
                }],
                // Optimize imports
                ['babel-plugin-import', {
                  libraryName: 'react-native-vector-icons',
                  libraryDirectory: '',
                  camel2DashComponentName: false,
                }, 'react-native-vector-icons'],
                // Dead code elimination
                'babel-plugin-transform-remove-undefined',
                // Inline environment variables
                ['babel-plugin-transform-inline-environment-variables', {
                  include: ['NODE_ENV', 'REACT_APP_ENV'],
                }],
              ],
            },
          },
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[contenthash:8].[ext]',
                outputPath: 'assets/images/',
              },
            },
            {
              loader: 'image-webpack-loader',
              options: {
                mozjpeg: {
                  progressive: true,
                  quality: 85,
                },
                optipng: {
                  enabled: false,
                },
                pngquant: {
                  quality: [0.8, 0.9],
                  speed: 4,
                },
                gifsicle: {
                  interlaced: false,
                },
                webp: {
                  quality: 85,
                },
              },
            },
          ],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          use: {
            loader: 'file-loader',
            options: {
              name: '[name].[contenthash:8].[ext]',
              outputPath: 'assets/fonts/',
            },
          },
        },
      ],
    },
    
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      alias: {
        // Optimize React Native for web
        'react-native$': 'react-native-web',
        'react-native-linear-gradient': 'react-native-web-linear-gradient',
        'react-native-vector-icons': '@expo/vector-icons',
      },
      // Reduce bundle size by avoiding duplicate modules
      symlinks: false,
    },
    
    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            parse: {
              ecma: 8,
            },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2,
              drop_console: isProduction,
              drop_debugger: isProduction,
              pure_funcs: isProduction ? [
                'console.log',
                'console.info',
                'console.debug',
                'console.warn',
                'console.trace',
              ] : [],
              passes: 3,
              toplevel: true,
              unsafe: true,
              unsafe_comps: true,
              unsafe_math: true,
              unsafe_methods: true,
            },
            mangle: {
              safari10: true,
              toplevel: true,
            },
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true,
            },
          },
          extractComments: false,
          parallel: true,
        }),
      ],
      
      // Split chunks for better caching
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 20,
          },
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom|react-native)[\\/]/,
            name: 'react',
            chunks: 'all',
            priority: 30,
          },
          expo: {
            test: /[\\/]node_modules[\\/](@expo|expo-)[\\/]/,
            name: 'expo',
            chunks: 'all',
            priority: 25,
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 10,
            reuseExistingChunk: true,
          },
        },
      },
      
      // Tree-shaking optimization
      usedExports: true,
      sideEffects: false,
    },
    
    plugins: [
      // Gzip compression
      ...(isProduction ? [
        new CompressionPlugin({
          algorithm: 'gzip',
          test: /\.(js|css|html|svg)$/,
          threshold: 8192,
          minRatio: 0.8,
        }),
        
        // Brotli compression for better compression ratios
        new CompressionPlugin({
          filename: '[path][base].br',
          algorithm: 'brotliCompress',
          test: /\.(js|css|html|svg)$/,
          compressionOptions: {
            level: 11,
          },
          threshold: 8192,
          minRatio: 0.8,
        }),
        
        // Bundle analyzer for optimization insights
        ...(process.env.ANALYZE ? [
          new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
            reportFilename: 'bundle-report.html',
          }),
        ] : []),
      ] : []),
    ],
    
    // Performance optimization
    performance: {
      maxAssetSize: 250000,
      maxEntrypointSize: 250000,
      hints: isProduction ? 'warning' : false,
    },
    
    // Production source maps for debugging
    devtool: isProduction ? 'source-map' : 'eval-source-map',
    
    // Output configuration
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction 
        ? '[name].[contenthash:8].js'
        : '[name].js',
      chunkFilename: isProduction
        ? '[name].[contenthash:8].chunk.js'
        : '[name].chunk.js',
      clean: true,
    },
    
    // Development server configuration
    devServer: {
      static: {
        directory: path.join(__dirname, 'public'),
      },
      compress: true,
      port: 3000,
      hot: true,
      historyApiFallback: true,
    },
  };
};