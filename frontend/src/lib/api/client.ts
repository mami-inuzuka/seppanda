import axios from 'axios'
import applyCaseMiddleware from 'axios-case-converter'

// ヘッダーに関してはケバブケースのままにする
const options = {
  ignoreHeaders: true,
}

const client = applyCaseMiddleware(
  axios.create({
    baseURL: 'http://localhost:3001/api',
  }),
  options
)

export default client
