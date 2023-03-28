module.exports = function override(config, env) {

  okv = {
    fallback: {
      fs: false,
      net: false,
      tls: false,
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
      url: require.resolve("url"),
      util: require.resolve("util"),
      assert: require.resolve("assert"),
      os: require.resolve("os-browserify"),
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
      zlib: require.resolve("browserify-zlib"),
      path: require.resolve("path-browserify")
    },
  };

  if (!config.resolve) {
    config.resolve = okv;
  } else {
    config.resolve.fallback = { ...config.resolve.fallback, ...okv.fallback };
  }

  return config;
}