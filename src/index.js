import { certGenerntor } from './certManager'

class ProxyServe {
  constructor (options) {
    this.options = {
      dirPath: '', // 生成证书路径
      keys: '',
      cert: '',
      host: '',
      port: '',
      ...options
    }
    this.middleware = []
    certGenerntor()
  }
  /**
   * 自定义中间件
   * @param {Function} middleware 中间件函数
   */
  use (middleware) {
    this.middleware.push(middleware)
  }

  /**
   * 获取证书路径
   */
  getCertPath () {
    return {
      keys: this.options.keys,
      cert: this.options.cert
    }
  }
}

module.exports = ProxyServe
