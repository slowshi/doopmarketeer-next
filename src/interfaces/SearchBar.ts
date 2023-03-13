type SearchBarParams = {
  type: string
  value: string
  onSubmit: (type: string, value: string) => void
}
type SearchBarResponse = {
  type: string
  value: string
}
export type { SearchBarParams, SearchBarResponse }
