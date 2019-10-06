class DonePlugin {
  apply(compiler) {
    compiler.hooks.done.tap('DonePlugin', (states) => {
      console.log('Done');
    });
  }
}

module.exports = DonePlugin;