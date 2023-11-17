import { schemaKeys, Schema } from './constants'

export const convertJson = (id, input: string) => {
  const rows = input.split(/\r?\n/)
  const validRows = rows.filter((row) => row.length > 0)
  if (validRows.length === 0) return
  const result = validRows.map((row) => {
    return buildJson(id, row)
  })
  return result
}

const buildJson = (id: number, row: string) => {
  const values = row.split('|')
  const json: Record<string, string | number> = {}
  const schema = Schema[id - 1] ?? Schema[0]
  values.forEach((value, index) => {
    const key = schema.keys[index]
    if (value && key) {
      if (schema.isNumber[key]) {
        let intValue: string | number = Number(value)
        if (Number.isNaN(intValue)) {
          intValue = value
        }
        json[key] = intValue
      } else {
        json[key] = value
      }
    }
  })
  return json
}
