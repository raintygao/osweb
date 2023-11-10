import { Typography, List } from '@douyinfe/semi-ui'

export const History = ({ record }) => {
  return (
    <div>
      <Typography.Title heading={3} style={{ margin: '8px 0' }}>
        历史记录
      </Typography.Title>
      <List
        bordered
        dataSource={record}
        renderItem={(item) => <List.Item>{JSON.stringify(item)}</List.Item>}
      />
    </div>
  )
}
