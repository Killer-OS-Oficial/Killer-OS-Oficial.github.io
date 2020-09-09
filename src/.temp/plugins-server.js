import plugin_gridsome_vue_remark_6 from "/home/killer/Documentos/Dev/Killer-OS-Oficial.github.io/node_modules/@gridsome/vue-remark/gridsome.client.js"
import plugin_gridsome_plugin_tailwindcss_8 from "/home/killer/Documentos/Dev/Killer-OS-Oficial.github.io/node_modules/gridsome-plugin-tailwindcss/gridsome.client.js"
import plugin_gridsome_plugin_google_analytics_9 from "/home/killer/Documentos/Dev/Killer-OS-Oficial.github.io/node_modules/@gridsome/plugin-google-analytics/gridsome.client.js"
import plugin_gridsome_plugin_yandex_metrika_10 from "/home/killer/Documentos/Dev/Killer-OS-Oficial.github.io/node_modules/gridsome-plugin-yandex-metrika/gridsome.client.js"

export default [
  {
    run: plugin_gridsome_vue_remark_6,
    options: {}
  },
  {
    run: plugin_gridsome_plugin_tailwindcss_8,
    options: {"tailwindConfig":"./tailwind.config.js","purgeConfig":{"whitelistPatternsChildren":[{}]},"shouldImport":true,"shouldTimeTravel":true,"importUrlConfig":{"modernBrowser":true},"presetEnvConfig":{"stage":0,"autoprefixer":false,"features":{"focus-visible-pseudo-class":false,"focus-within-pseudo-class":false}}}
  },
  {
    run: plugin_gridsome_plugin_google_analytics_9,
    options: {"id":"#"}
  },
  {
    run: plugin_gridsome_plugin_yandex_metrika_10,
    options: {"id":67192255}
  }
]
