import QRCode from './src/QRCode'

import type { App } from 'vue'

QRCode.install = (app: App<Element>) => {
  app.component(QRCode.name, QRCode)
}

export default QRCode
export { QRCodeStatus, QRCodeLevel, QRCodeRenderResponse } from './src/types'
