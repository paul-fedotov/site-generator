const baseUrl = require('./configs/base_url').baseUrl || '';

module.exports = {
  assetPrefix: baseUrl,
  webpack: (config) => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty'
    };

    return config
  }
};
