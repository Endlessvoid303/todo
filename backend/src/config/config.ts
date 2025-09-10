import { Config } from './createConfig'
import { defaultConfig } from './items/default'
import { stagingConfig } from './items/staging'

export const configs: Record<string, Config> = {
  default: defaultConfig,
  staging: stagingConfig,
}
export const getConfig = () => {
  return configs[process.env.SELECTED_CONFIG || 'default']
}
export const config = getConfig()
