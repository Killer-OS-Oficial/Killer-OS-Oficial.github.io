import VueYandexMetrika from 'vue-yandex-metrika'

export default function (Vue, options, { isServer: disabled, router }) {
  if(process.isClient) {
    const { default: VueYandexMetrika } = require('vue-yandex-metrika')
    Vue.use(VueYandexMetrika, {
      router: router,
      env: process.env.NODE_ENV,
      ...options
    })
  }
}
