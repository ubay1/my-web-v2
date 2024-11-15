export interface IDynamicInterface<T = any> {
  value: T
}

export function funcDnamicInterface<T>(data: T): IDynamicInterface<T> {
  const value = data as T
  console.log('value is = ', value)
  return { value }
}

export function testDynamicInterface() {
  const a: IDynamicInterface<{ er: string }> = { value: { er: 'ss' } }
  funcDnamicInterface<string>('aa')
  console.log(a.value)
}
