const CertManager = require('node-easy-cert')
const path = require('path')

function getUserHome () {
  return process.env.HOME || process.env.USERPROFILE;
}

const defaultOptions = {
  // default to /{USER_HOME}/{.cyyjs_certs}/
  rootDirPath: path.join(getUserHome(), '/.cyyjs_certs/'),
  defaultCertAttrs: [
    { name: 'countryName', value: 'CN' },
    { name: 'organizationName', value: 'CyyjsProxyServer' },
    { shortName: 'ST', value: 'BeiJing' },
    { shortName: 'OU', value: 'CyyjsProxyServer SSL' }
  ]
}

class Manager {
  constructor (options = {}) {
    this.rootDirPath = options.rootDirPath || defaultOptions.rootDirPath
    this.crtMgr = new CertManager({
      ...options,
      ...defaultOptions
    })
  }

  // 获取由当前cert-manager实例所管理的证书的根目录
  getRootDirPath() {
    return this.crtMgr.getRootDirPath()
  }

  // 获取根证书是否存在的状态
  isRootCAFileExists() {
    return this.crtMgr.isRootCAFileExists()
  }

  // 获取根证书的全路径
  getRootCAFilePath () {
    return this.crtMgr.getRootCAFilePath()
  }

  // 检测RootCA是否已经被信任
  ifRootCATrusted () {
    return new Promise((resolve, reject) => {
      this.crtMgr.ifRootCATrusted((error, trusted) => {
        if (error) {
          return reject(error)
        }
        return resolve(trusted)
      })
    })
  }

  /**
   * 在证书根目录下面生成根证书rootCA.crt 和 rootCA.key
   * @param {Object} options 配置参数
   * @param {Boolean} force 是否强制重新生成证书
   */
  generateRootCA (options = {}, force = false) {
    return new Promise((resolve, reject) => {
      if (force) {
        this.crtMgr.clearCerts()
      }
      
      if (this.crtMgr.isRootCAFileExists()) {
        let crtPath = this.crtMgr.getRootCAFilePath()
        let keyPath = path.join(this.rootDirPath, 'rootCA.key')
        return resolve({
          crtPath, keyPath
        })
      }

      this.crtMgr.generateRootCA({
        commonName: 'CyyjsProxyServer',
        ...options
      }, (error, keyPath, crtPath) => {
        if (error) {
          return reject(error)
        }
        return resolve({
          keyPath, crtPath
        })
      })
    })
  }
}


module.exports = Manager
