type K = {
  [name: string]: string
  time: string
}
type L = Record<'typeBebas1' | 'typeBebas2', number>

const salary: L = {
  typeBebas1: 1000,
  typeBebas2: 2000,
}

const k: K = { x: 'x', 1: 'b', time: '111' }
console.log(`index signature k['x'] = ${k['x']}`)
console.log(`index signature k[1] = ${k[1]}`)
console.log(`index signature k['1'] = ${k['1']}`) // Same result as k[1]

export const testIndexSignature = () => {
  return k
}
