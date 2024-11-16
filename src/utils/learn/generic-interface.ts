export interface IDynamicInterface<T = any> {
  value1: T
  value2: number
}

export function funcDnamicInterface<T, K extends number>(data1: T, data2: K): IDynamicInterface<T> {
  const value1 = data1 as T
  const value2 = data2 as K
  return { value1, value2 }
}

export function testDynamicInterface() {
  const a: IDynamicInterface<{ er: string }> = { value1: { er: 'ss' }, value2: 123 }
  const b = funcDnamicInterface({ ba: 'baba' }, 12)
  console.log(a.value1)
  console.log(b.value2)
}
