import development from './development.json'
import production from './production.json'

const configs = {
  development,
  production
}

const ENV = process.env.NODE_ENV || 'production'

export default configs[ENV]
