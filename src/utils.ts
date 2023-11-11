import { schemaKeys } from './constants'

export const convertJson = (input: string) => {
  const rows = input.split(/\r?\n/)
  const validRows = rows.filter((row) => row.length > 0)
  if (validRows.length === 0) return
  const result = validRows.map((row) => {
    return buildJson(row)
  })
  return result
}

const buildJson = (row: string) => {
  const values = row.split('|')
  const json: Record<string, string> = {}
  values.forEach((value, index) => {
    const key = schemaKeys[index]
    value && key && (json[key] = value)
  })
  return json
}
