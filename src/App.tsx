import React, { useCallback, useState } from 'react'
import './App.css'
import { TextArea, Layout, Button } from '@douyinfe/semi-ui'
import ReactJson from 'react-json-view'
import { convertJson } from './utils'
import { History } from './history'
import { useLocalStorageState } from 'ahooks'
import { STORAGE_KEY } from './constants'

function App() {
  const { Header, Footer, Content } = Layout
  const [inputValue, setInputValue] = useState('')
  const [json, setJson] = useState([])
  const [record, setRecord] = useLocalStorageState(STORAGE_KEY, {
    defaultValue: [],
  })

  const sendRequest = useCallback(() => {
    const json = convertJson(inputValue)
    setJson(json)
    console.log('json', json)
    setRecord(record.concat(json))
  }, [inputValue])

  return (
    <Layout className="components-layout-demo">
      <Header> </Header>
      <Layout>
        <Content
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ flexGrow: 2 }}>
            <TextArea
              autosize
              value={inputValue}
              onChange={setInputValue}
              style={{
                width: '100%',
              }}
              showClear
            />
            <Button onClick={sendRequest}>发送</Button>
          </div>
          <div style={{ flexGrow: 1 }}>
            <ReactJson enableClipboard={false} src={json} />
          </div>
        </Content>
        <History record={record} />
      </Layout>
      <Footer></Footer>
    </Layout>
  )
}

export default App
