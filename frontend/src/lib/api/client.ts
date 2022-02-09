import axios from 'axios'
import applyCaseMiddleware from 'axios-case-converter'

// ヘッダーに関してはケバブケースのままにする
const options = {
  ignoreHeaders: true,
}

const client = applyCaseMiddleware(
  axios.create({
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    baseURL: `${process.env.REACT_APP_API_URL}/api`,
  }),
  options
)

export default client
