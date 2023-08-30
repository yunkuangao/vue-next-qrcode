import QRCode from './qrcode/index'

import type { App } from 'vue'

const components = [QRCode]

const install = (app: App<Element>) => {
  components.forEach((curr) => {
    app.component(curr.name, curr)
  })
}

export default {
  install,
}
