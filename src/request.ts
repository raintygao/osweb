import axios from 'axios'

const ENDPOINT =
  'https://search-vote-test-zd-puuszg4vile2k6mpdoqopdqp7q.aos.ap-northeast-1.on.aws/receipts_test'
const username = 'zhengda',
  password = '!!Zhengda2023!!'
const URL = 'https://cgu78ku1p4.us.aircode.run/hello'

export async function postData(data = {}) {
  return axios.get(URL)
}
