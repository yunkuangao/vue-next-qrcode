/**
 *
 * @author Ray <https://github.com/XiaoDaiGua-Ray>
 *
 * @date 2023-08-29
 *
 * @workspace ray-template
 *
 * @remark 今天也是元气满满撸代码的一天
 */

import './index.scss'

import { NButton, NSpin } from 'naive-ui'
import { defineComponent, ref, onMounted } from 'vue'

import props from './props'
import { AwesomeQR } from 'awesome-qr'
import { call } from '../../__utils/vue/call'

import type { QRCodeRenderResponse } from './types'

const QRCode = defineComponent({
  name: 'QRCode',
  props,
  setup(props, ctx) {
    const { expose } = ctx

    const qrcodeURL = ref<QRCodeRenderResponse>()
    const spinOverrides = {
      opacitySpinning: '0.1',
    }

    const renderQRCode = () => {
      new AwesomeQR({
        ...props,
      })
        .draw()
        .then((res) => {
          const { onSuccess } = props

          if (onSuccess) {
            call(onSuccess, res)
          }

          qrcodeURL.value = res
        })
        .catch((err) => {
          const { onError } = props

          if (onError) {
            call(onError, err)
          }
        })
    }

    const errorActionClick = () => {
      if (ctx.slots.errorAction) {
        return
      }

      const { onReload } = props

      if (onReload) {
        call(onReload)
      }
    }

    expose({})

    onMounted(() => {
      renderQRCode()
    })

    return {
      qrcodeURL,
      spinOverrides,
      errorActionClick,
    }
  },
  render() {
    return (
      <div class="ray-qrcode">
        <NSpin
          show={this.status === 'loading'}
          themeOverrides={this.spinOverrides}
        >
          <img src={this.qrcodeURL as string | undefined} />
        </NSpin>
        {this.status === 'error' ? (
          <div class="ray-qrcode__error">
            <div class="ray-qrcode__error-content">
              {typeof this.errorDescription === 'string'
                ? this.errorDescription
                : () => this.errorDescription}
            </div>
            <div
              class="ray-qrcode__error-btn"
              onClick={this.errorActionClick.bind(this)}
            >
              {this.$slots.errorAction ? (
                this.$slots.errorAction()
              ) : (
                <>
                  <NButton text color="#ffffff">
                    {{
                      default: () => this.errorActionDescription,
                    }}
                  </NButton>
                </>
              )}
            </div>
          </div>
        ) : null}
      </div>
    )
  },
})

export default QRCode
