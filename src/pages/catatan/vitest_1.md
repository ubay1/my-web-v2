---
layout: ../../layouts/MarkdownLayout.astro
title: Belajar Vitest
description: matcher jest, assert chai, concurrent, .skip, .only
imagePath: https://miro.medium.com/v2/resize:fit:1200/1*6YEGcCs46UW8KmFs3hDWgA.png
imageAlt: ts
viewTransitionName: 'vitest-1'
date: 2024-10-12 07:00
icon: 'devicon:vitest'
tags:
  - unit test
  - vitest
  - typescript
---

> di vitest kita bisa menggunakan jest atau chai.
> 
> kita bisa jalankan **npx vitest**, untuk watch mode jika ada perubahan pada file tidak perlu running ulang test lagi.

<br>

# Test Filtering

## skip

<br>

> jika kita menambahkan skip pada describe, maka semua test didalamnya tidak akan dijalankan

<br>

```ts
describe.skip('skipped suite', () => {
  it('test', () => {
    // Suite skipped, no error
    assert.equal(Math.sqrt(4), 3)
  })
  it('1 + 1', () => {
    assert.equal(1 + 1, 2)
  })
})
```

test yang dijalankan hanya yang tidak menggunakan .skip

```ts
describe('suite', () => {
  it.skip('skipped test', () => {
    // Test skipped, no error
    assert.equal(Math.sqrt(4), 3)
  })
  it('1 + 1', () => {
    assert.equal(1 + 1, 2)
  })
})
```

## only

<br>

> jika kita menambahkan only pada describe atau test/it di suatu file, maka test yang dijalankan hanya yang menggunakan .only saja, yang lainnya di skip.

<br>

```ts
describe.only('.only pada describe', () => {
  it('test', () => {
    assert.equal(Math.sqrt(4), 2)
  })
})

describe('.only pada test/it', () => {
  it('skipped test', () => {
    // Test skipped, as tests are running in Only mode
    assert.equal(Math.sqrt(4), 3)
  })

  it.only('test', () => {
    // Only this test (and others marked with only) are run
    assert.equal(Math.sqrt(4), 2)
  })
})
```



# Matcher pada jest
<br>

## Matcher Umum

toBe() = untuk cek nilai hasil dari expect(2 + 2).
```ts
test('2 + 2 = 4', () => {
  expect(2 + 2).toBe(4);
});
```
<br>

not.toBe() = untuk cek nilai hasil dari expect(1 + 2)
```ts
test('1 + 2 != 2', () => {
  expect(sum(1, 2)).not.toBe(2);
});
```

toEqual() = untuk cek nilai biasa ataupun object
```ts
test('2 + 2 = 4', () => {
  expect(2 + 2).toEqual(4);
});
```
```ts
test('cek object', () => {
  const data = {one: 1};
  data['two'] = 2;
  expect(data).toEqual({one: 1, two: 2});
});
```

## Matcher Truthiness (untuk cek hasil bernilai true atau false)
<br>

```ts
test('cek nilai null', () => {
  const n = null;
  expect(z).not.toBeNull(); // false
  expect(n).toBeNull(); // true
  expect(n).toBeDefined(); // true
  expect(n).not.toBeUndefined(); // true
  expect(n).not.toBeTruthy(); // true
  expect(n).toBeFalsy(); // true
});

test('cek nilai 0', () => {
  const z = 0;
  expect(n).toBeNull(); // false
  expect(z).not.toBeNull(); // true
  expect(z).toBeDefined(); // true
  expect(z).not.toBeUndefined(); // true
  expect(z).not.toBeTruthy(); // true
  expect(z).toBeFalsy(); // true
});
```

## Matcher Numbers
<br>

```ts
test('2 + 2', () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(3);
  expect(value).toBeGreaterThanOrEqual(3.5);
  expect(value).toBeLessThan(5);
  expect(value).toBeLessThanOrEqual(4.5);

  // toBe and toEqual are equivalent for numbers
  expect(value).toBe(4);
  expect(value).toEqual(4);
})
```

untuk floating number bisa gunakan toBeCloseTo

```ts
test('adding floating point numbers', () => {
  const value = 0.1 + 0.2;
  //expect(value).toBe(0.3);           This won't work because of rounding error
  expect(value).toBeCloseTo(0.3); // This works.
});
```

## Matcher string
<br>

```ts
describe('matcher string', () => {
  test('there is no I in team', () => {
    expect('team').not.toMatch(/I/);
  });

  it('but there is a "stop" in Christoph', () => {
    expect('Christoph').toMatch(/stoph/);
  });
})
```

## Matcher array
<br>

```ts
const shoppingList = [
  'diapers',
  'kleenex',
  'trash bags',
  'paper towels',
  'milk',
];

test('the shopping list has milk on it', () => {
  expect(shoppingList).toContain('milk');
  expect(new Set(shoppingList)).toContain('milk');
});
```

## Matcher exception
<br>

```ts
function compileAndroidCode() {
  throw new Error('you are using the wrong JDK!');
}

test('compiling android goes as expected', () => {
  expect(() => compileAndroidCode()).toThrow();
  expect(() => compileAndroidCode()).toThrow(Error);

  // You can also use a string that must be contained in the error message or a regexp
  expect(() => compileAndroidCode()).toThrow('you are using the wrong JDK');
  expect(() => compileAndroidCode()).toThrow(/JDK/);

  // Or you can match an exact error message using a regexp like below
  expect(() => compileAndroidCode()).toThrow(/^you are using the wrong JDK$/); // Test fails
  expect(() => compileAndroidCode()).toThrow(/^you are using the wrong JDK!$/); // Test pass
});
```

<br>

> Lengkapnya bisa cek disini https://jestjs.io/docs/expect

<br>

# Menggunakan assert milik chai

chai memiliki 2 style, kita bisa menggunakan gaya expect, atau menggunakan assert.

```ts
import { assert, describe, it } from 'vitest'

describe('chai', () => {
  it('test', () => {
    assert.isOk(true, 'everything is ok')
    // assert.isOk(false, 'this will fail')
    assert.equal('3', '3', '== coerces values to strings')
    assert.deepEqual({ tea: 'green' }, { tea: 'green' }) // cek object
  })
})
```
<br>

> Lengkapnya bisa cek disini https://www.chaijs.com/api/assert/

<br>

# Test secara parallel dengan concurrent

dua unit akan di jalankan bersamaan, jika yang menggunakan concurrent hanya pertama dan ketiga, maka concurrent tidak jalan


```ts
describe('suite', () => {
  it('serial test 1', async () => {
    await new Promise((resolve) => {
      setTimeout(resolve, 3000)
    })
    expect(1).toBe(1)
  })
  it.concurrent('serial test 2', async () => {
    await new Promise((resolve) => {
      setTimeout(resolve, 1000)
    })
    expect(1).toBe(1)
  })
  it.concurrent('serial test 3', async () => {
    await new Promise((resolve) => {
      setTimeout(resolve, 2000)
    })
    expect(1).toBe(1)
  })
})
```

jika kita ingin semua unit bisa berjalan secara parallel, kita bisa menambahkan .concurrent cukup di describe nya. lihat kode dibawah

```ts
describe.concurrent('suite', () => {
  it('serial test 1', async () => {
    await new Promise((resolve) => {
      setTimeout(resolve, 3000)
    })
    expect(1).toBe(1)
  })
  it('serial test 2', async () => {
    await new Promise((resolve) => {
      setTimeout(resolve, 1000)
    })
    expect(1).toBe(1)
  })
  it('serial test 3', async () => {
    await new Promise((resolve) => {
      setTimeout(resolve, 2000)
    })
    expect(1).toBe(1)
  })
})
```