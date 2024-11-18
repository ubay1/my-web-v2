import { registerSW } from 'virtual:pwa-register'

registerSW({
  immediate: true,
  onRegisteredSW<T extends unknown>(swScriptUrl: T) {
    // eslint-disable-next-line no-console
    console.log('SW registered: ', swScriptUrl)
  },
  onOfflineReady() {
    // eslint-disable-next-line no-console
    console.log('PWA application ready to work offline')
  },
})
