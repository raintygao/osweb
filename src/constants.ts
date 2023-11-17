export const schemaKeys = [
  'name',
  'prop_id',
  'area',
  'topic',
  'vote',
  'version',
]

export const Schema = [
  {
    index: 'receipts',
    keys: ['id', 'area', 'building', 'room', 'version'],
    isNumber: {
      id: true,
      area: true,
    },
    constants: {
      collected: 1,
      faketimestamp: 1699704230263,
    },
  },
  {
    index: 'votes',
    keys: ['id', 'area', 'building', 'room', 'topic', 'result', 'version'],
    isNumber: {
      id: true,
      area: true,
      version: true,
    },
    constants: {
      faketimestamp: 1699704230263,
    },
  },
  {
    index: 'prevotes',
    keys: ['id', 'area', 'building', 'room', 'topic', 'result', 'version'],
    isNumber: {
      id: true,
      area: true,
      version: true,
    },
    constants: {
      faketimestamp: 1699704230263,
    },
  },
]
export const STORAGE_KEY = 'osweb_request_record'
