const cache = require('../../cache');

module.exports = cache(function loadWASMBundle(bundle) {
  return fetch(bundle)
    .then(function(res) {
      if (WebAssembly.instantiateStreaming) {
        return WebAssembly.instantiateStreaming(res);
      } else {
        return res.arrayBuffer().then(function(data) {
          return WebAssembly.instantiate(data);
        });
      }
    })
    .then(function(wasmModule) {
      return wasmModule.instance.exports;
    });
});
