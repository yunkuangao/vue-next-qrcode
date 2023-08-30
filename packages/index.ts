import QRCode from './qrcode/index'

import type { App } from 'vue'

const components = [QRCode]

const install = (app: App<Element>) => {
  components.forEach((curr) => {
    app.component(curr.name, curr)
  })
}

// @ts-ignore
if (typeof window !== 'undefined' && window.Vue) {
  // @ts-ignore
  install(window.Vue)
}

export default {
  install,
  QRCode,
}
