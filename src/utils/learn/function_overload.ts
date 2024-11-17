function combine(a: number, b: number): number // Overload 1
function combine(a: string, b: string): string // Overload 2
function combine(a: any, b: any): any {
  if (typeof a === 'number' && typeof b === 'number') {
    return a + b
  } else if (typeof a === 'string' && typeof b === 'string') {
    return a + b
  }
  throw new Error('Invalid arguments')
}

export const result1 = combine(1, 2) // number
export const result2 = combine('Hello', ' World') // string
console.log('function overload = ', result1)
console.log('function overload = ', result2)
