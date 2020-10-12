const App = require('../src')
let app = new App()

app.getCertPath().then(({ keyPath, crtPath }) => {
  console.log('keyPath:', keyPath)
  console.log('crtPath', crtPath)
}).catch(e => {
  console.log(e)
})
