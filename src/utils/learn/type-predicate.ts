function isString(value: unknown): value is string {
  return typeof value === 'string'
}

export function printLength(value: unknown) {
  console.log('isString(value) = ', isString(value))
  if (isString(value)) {
    console.log(value.length) // Aman: value pasti string
  } else {
    console.log('Value is not a string.')
  }
}

printLength('Hello, Ubay!') // Output: 13
