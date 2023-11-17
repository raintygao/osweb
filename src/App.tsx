import React, { useCallback, useMemo, useRef, useState } from 'react'
import './App.css'
import { TextArea, Layout, Button, Banner } from '@douyinfe/semi-ui'
import ReactJson from 'react-json-view'
import { convertJson } from './utils'
import { History } from './history'
import { useLocalStorageState, useRequest } from 'ahooks'
import { STORAGE_KEY } from './constants'
import { postData } from './request'
import { Schema } from './constants'

function getQueryVariable(variable) {
  var query = window.location.search.substring(1)
  var vars = query.split('&')
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=')
    if (pair[0] == variable) {
      return pair[1]
    }
  }
  return false
}

function App() {
  const { Header, Footer, Content } = Layout
  const [inputValue, setInputValue] = useState('')
  const [json, setJson] = useState([])
  const pageId = getQueryVariable('id')
  const [record, setRecord] = useLocalStorageState(`${STORAGE_KEY}_${pageId}`, {
    defaultValue: [],
  })
  const indexName = useMemo(() => {
    const schema = Schema[Number(pageId) - 1]
    return schema.index
  }, [pageId])

  const textRef = useRef()

  const saveRecord = useCallback(() => {
    const transformsSpaceInput = inputValue.replaceAll(/\n+/g, '\n')
    setRecord(record.concat(transformsSpaceInput))
    // setRecord(record.concat(inputValue))
  }, [inputValue, setRecord, record])

  const { data, error, loading, run, mutate } = useRequest(postData, {
    manual: true,
    onBefore: () => {},
    onSuccess: ({ data }) => {
      if (data?.errors === false) {
        saveRecord()
        setInputValue('')
        if (textRef?.current && textRef?.current?.focus) {
          textRef?.current?.focus()
        }
      } else if (data?.errors === true) {
        console.error(data?.error)
        if (data.message) {
          throw new Error(data.message)
        } else {
          throw new Error('服务端存储失败')
        }
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
              autosize={{ minRows: 25 }}
              value={inputValue}
              onChange={setInputValue}
              style={{
                width: '100%',
                marginBottom: '24px',
              }}
              showClear
              ref={textRef}
            />
            {!error && data && <Banner type="success" description="发送成功" />}
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
