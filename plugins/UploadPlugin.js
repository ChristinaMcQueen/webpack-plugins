const path = require("path");
const qiniu = require("qiniu");

class UploadPlugin {
  constructor(options) {
    const { bucket = "", domain = "", accessKey = "", secretKey = "" } = options;
    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    const putPolicy = new qiniu.rs.PutPolicy({ scope: bucket });
    this.uploadToken = putPolicy.uploadToken(mac);
    const config = new qiniu.conf.Config();
    this.formUploader = new qiniu.form_up.FormUploader(config);
    this.putExtra = new qiniu.form_up.PutExtra();
  }

  upload(filename) {
    return new Promise((resolve, reject) => {
      const localFile = path.resolve(__dirname, '../dist', filename);
      this.formUploader.putFile(this.uploadToken, filename, localFile, this.putExtra, (respBody, respInfo) => {
        if (respErr) {
          reject(respErr);
        }
        if (respInfo.statusCode === 200) {
          resolve(respBody);
        }
      });
    });
  }

  apply(compiler) {
    compiler.hooks.afterEmit.tapPromise('UploadPlugin', (compilation) => {
      const { assets } = compilation;
      const promises = [];
      Object.keys(assets).forEach(filename => {
        promises.push(this.upload(filename));
      });
      return Promise.all(promises);
    });
  }
}

module.exports = UploadPlugin;