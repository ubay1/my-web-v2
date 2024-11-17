type Obj = {
  [sym: symbol]: number
}

const a = Symbol('a')
const b = Symbol('b')
let obj: Obj = {}
obj[a] = 123
obj[b] = 456

console.log(obj[a]) // 123
console.log(obj[b]) // 456

export function testSymbolTypes() {
  type Car = {
    [key: symbol]: string
  }
  const car: Car = {}
  const model = Symbol('model')
  const color = Symbol('color')
  car[model] = 'Toyota'
  car[color] = 'Red'
  console.log(car[model])
  console.log(car[color])

  return { model: car[model], color: car[color] }
}
