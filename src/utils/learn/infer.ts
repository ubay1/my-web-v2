function fetchData(): Promise<{ id: number; name: string }> {
  return Promise.resolve({ id: 1, name: 'Ubay' })
}
type ReturnTypePromise<T> = T extends () => infer R ? R : never
// Menggunakan helper type
type DataType = ReturnTypePromise<typeof fetchData>
fetchData().then((data) => console.log(data))
