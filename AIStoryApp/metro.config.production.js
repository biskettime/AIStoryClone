/**
 * Metro configuration for production bundle optimization
 * Enhanced compression and tree-shaking for minimal bundle size
 */

const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration for production optimization
 */
const config = {
  resolver: {
    // Enable tree-shaking and dead code elimination
    unstable_enableSymlinks: false,
    unstable_enablePackageExports: true,
    
    // Asset extensions for optimization
    assetExts: [
      'bin', 'txt', 'jpg', 'png', 'json', 'gif', 'webp', 'svg',
      'ttf', 'otf', 'woff', 'woff2', 'eot', 'mp3', 'mp4', 'wav'
    ],
    
    // Source extensions for processing
    sourceExts: [
      'js', 'jsx', 'ts', 'tsx', 'json', 'cjs', 'mjs'
    ],
  },
  
  transformer: {
    // Enable minification in production
    minifierPath: require.resolve('metro-minify-terser'),
    minifierConfig: {
      // Terser options for maximum compression
      ecma: 2017,
      parse: {
        ecma: 2017,
      },
      compress: {
        drop_console: true,      // Remove console.log statements
        drop_debugger: true,     // Remove debugger statements
        pure_funcs: [           // Mark functions as pure for elimination
          'console.log',
          'console.info',
          'console.warn',
          'console.debug',
          'console.trace',
        ],
        passes: 3,              // Multiple optimization passes
        unsafe: true,           // Enable unsafe optimizations
        unsafe_comps: true,     // Unsafe comparisons
        unsafe_math: true,      // Unsafe math optimizations
        unsafe_methods: true,   // Unsafe method optimizations
        collapse_vars: true,    // Collapse variable declarations
        reduce_vars: true,      // Reduce variable usage
        join_vars: true,        // Join variable declarations
        sequences: true,        // Join consecutive statements
        dead_code: true,        // Remove unreachable code
        conditionals: true,     // Optimize conditionals
        evaluate: true,         // Evaluate constant expressions
        booleans: true,         // Optimize boolean expressions
        loops: true,            // Optimize loops
        if_return: true,        // Optimize if-return blocks
        inline: true,           // Inline functions
        properties: true,       // Optimize property access
        hoist_funs: true,       // Hoist function declarations
        hoist_vars: false,      // Don't hoist var declarations (can break code)
        toplevel: true,         // Enable top-level optimizations
      },
      mangle: {
        // Mangle variable names for smaller size
        toplevel: true,
        eval: true,
        keep_fnames: false,     // Don't preserve function names
        reserved: [             // Don't mangle these names
          'exports',
          'require',
          'module',
          '__filename',
          '__dirname',
        ],
        properties: {
          regex: /^_/,          // Mangle properties starting with underscore
        },
      },
      output: {
        // Output options for smaller files
        ascii_only: true,       // Use ASCII characters only
        comments: false,        // Remove comments
        beautify: false,        // Don't beautify output
        semicolons: false,      // Remove unnecessary semicolons
      },
      sourceMap: false,         // Disable source maps in production
    },
    
    // Enable experimental optimizations
    experimentalImportSupport: true,
    inlineRequires: true,
    
    // Asset transformations
    assetTransforms: {
      // Optimize images during build
      optimizeImages: true,
      webpQuality: 85,
      jpegQuality: 85,
      pngQuality: 85,
    },
  },
  
  serializer: {
    // Bundle splitting and optimization
    createModuleIdFactory: () => {
      const cache = new Map();
      let nextId = 0;
      return (path) => {
        if (cache.has(path)) {
          return cache.get(path);
        }
        const id = nextId++;
        cache.set(path, id);
        return id;
      };
    },
    
    // Custom module filter for tree-shaking
    processModuleFilter: (modules) => {
      // Remove modules that are not actually used
      return modules.filter(module => {
        // Keep essential modules
        if (module.path.includes('node_modules/react-native/')) return true;
        if (module.path.includes('node_modules/expo/')) return true;
        if (module.path.includes('/src/')) return true;
        
        // Remove development-only modules
        if (module.path.includes('__tests__')) return false;
        if (module.path.includes('.test.')) return false;
        if (module.path.includes('.spec.')) return false;
        if (module.path.includes('/debug/')) return false;
        
        return true;
      });
    },
    
    // Optimize the bundle
    getRunModuleStatement: (moduleId) => {
      return `__r(${moduleId});`;
    },
    
    // Custom polyfills for smaller bundle
    getPolyfills: () => [
      require.resolve('react-native/Libraries/polyfills/console.js'),
      require.resolve('react-native/Libraries/polyfills/error-guard.js'),
      require.resolve('react-native/Libraries/polyfills/Object.es6.js'),
    ],
  },
  
  // Server configuration for faster builds
  server: {
    port: 8081,
    rewriteRequestUrl: (url) => {
      // Rewrite URLs for better caching
      if (url.includes('hot-reload')) {
        return null; // Disable hot reload in production
      }
      return url;
    },
  },
  
  // Cache configuration for faster subsequent builds
  cacheStores: [
    {
      name: 'filesystem',
      maxEntries: 5000,
    },
  ],
  
  // Watch configuration
  watchFolders: [],
  
  // Disable unnecessary features in production
  watcher: {
    additionalExts: [],
    watchman: {
      deferStates: ['hg.update'],
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);