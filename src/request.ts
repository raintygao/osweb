import axios from 'axios'

const ENDPOINT =
  'https://search-vote-test-zd-puuszg4vile2k6mpdoqopdqp7q.aos.ap-northeast-1.on.aws/receipts_test'
const username = 'zhengda',
  password = '!!Zhengda2023!!'
const AIRCODE_URL = 'https://cgu78ku1p4.us.aircode.run/hello'
const LAF_URL = 'https://lvuu1l.laf.run/osweb'

const appendIndexObject = (data) => {
  const object = { index: {} }
  let result = []
  data.forEach((item) => {
    result = result.concat([object, item])
  })
  return result
}

export async function postData(indexName, data = []) {
  const result = appendIndexObject(data)
  return axios.post(
    LAF_URL,
    {
      index: indexName,
      data: result,
    },
    {
      timeout: 2000,
    }
  )
}
