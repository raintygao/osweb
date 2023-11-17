import React, { useCallback, useMemo, useState } from 'react'
import './App.css'
import { TextArea, Layout, Button, Banner } from '@douyinfe/semi-ui'
import ReactJson from 'react-json-view'
import { convertJson } from './utils'
import { History } from './history'
import { useLocalStorageState, useRequest } from 'ahooks'
import { STORAGE_KEY } from './constants'
import { postData } from './request'
import { useParams } from 'react-router-dom'
import { Schema } from './constants'

function App() {
  const { Header, Footer, Content } = Layout
  const [inputValue, setInputValue] = useState('')
  const [json, setJson] = useState([])
  const [record, setRecord] = useLocalStorageState(STORAGE_KEY, {
    defaultValue: [],
  })
  const { id: pageId } = useParams()
  const indexName = useMemo(() => {
    const schema = Schema[Number(pageId) - 1]
    return schema.index
  }, [pageId])

  const saveRecord = useCallback(() => {
    setRecord(record.concat(json))
  }, [json, setRecord, record])

  const { data, error, loading, run, mutate } = useRequest(postData, {
    manual: true,
    onBefore: () => {},
    onSuccess: ({ data }) => {
      if (data?.errors === false) {
        console.log('success')
        saveRecord()
      }
      console.log('data', data)
    },
  })

  const sendRequest = useCallback(() => {
    mutate(null)
    const json = convertJson(pageId, inputValue)
    if (!json) return
    setJson(json)
    const combinedConstJson = json.map((item) => {
      return {
        ...item,
        ...Schema[Number(pageId) - 1].constants,
        timestamp: Date.now(),
      }
    })
    console.log('json', combinedConstJson)
    run(indexName, combinedConstJson)
  }, [record, setRecord, inputValue, pageId])

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
                marginBottom: '24px',
              }}
              showClear
            />
            {data && <Banner type="success" description="发送成功" />}
            {loading && <Banner type="info" description="发送中" />}
            {error && !loading && (
              <>
                <Banner type="danger" description={error.message} />
                <Banner
                  type="danger"
                  description="发送失败，点击发送重新发送"
                />
              </>
            )}
            <Button loading={loading} onClick={sendRequest}>
              发送
            </Button>
          </div>
          <div style={{ flexGrow: 1 }}>
            <ReactJson enableClipboard={false} src={json} />
          </div>
        </Content>

        <History record={record} setRecord={setRecord} />
      </Layout>
      <Footer></Footer>
    </Layout>
  )
}

export default App
