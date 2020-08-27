const CertManager = require('../src/certManager')

let certManager = new CertManager()

certManager.generateRootCA().then(({ keyPath, crtPath }) => {
  console.log('keyPath:', keyPath)
  console.log('crtPath', crtPath)
}).catch(e => {
  console.log(e)
})

certManager.ifRootCATrusted().then(trusted => {
  console.log('ifRootCATrusted:', trusted)
})

console.log('getRootDirPath:', certManager.getRootDirPath())
console.log('getRootCAFilePath:', certManager.getRootCAFilePath())
console.log('isRootCAFileExists:', certManager.isRootCAFileExists())