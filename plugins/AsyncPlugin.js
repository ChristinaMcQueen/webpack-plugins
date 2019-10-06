class AsyncPlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync('AsyncPlugin', (compilation, cb) => {
      setTimeout(() => {
        console.log("Emit");
        cb();
      }, 1000);
    });
    compiler.hooks.emit.tapPromise('tapPromise', (compilation) => {
      return new Promise((resolve,reject) => {
        setTimeout(() => {
          console.log("Wait 1 second");
          resolve();
        }, 1000);
      })
    });
  }
}

module.exports = AsyncPlugin;