import { Typography, List, Button } from '@douyinfe/semi-ui'
import React from 'react'

export const History = ({ record, setRecord }) => {
  return (
    <div style={{ marginTop: '24px' }}>
      <Typography.Title heading={3} style={{ margin: '8px 0' }}>
        历史记录{' '}
        <Button type="tertiary" onClick={() => setRecord([])}>
          清空
        </Button>
      </Typography.Title>

      <List
        bordered
        dataSource={record}
        renderItem={(item) => <List.Item>{JSON.stringify(item)}</List.Item>}
      />
    </div>
  )
}
