import _ from 'lodash'

// Returns Array<Number>
export function linesToNumbers(input) {
  return input.split('\n').map(Number)
}

// Returns Array<Number> of every number found in the line
export function extractNumbers(str) {
  return (str.match(/-?[0-9.,]+/g) || []).map(n => n.replace(/,/g, '')).map(Number)
}

// Returns true if given Object has some key with a value matching val
export function hasVal(obj, val) {
  return Object.values(obj).some(v => v === val)
}

// For trimming the example inputs in test files
export function trim(str) {
  return str
    .split('\n')
    .map(l => l.replace(/^\s*/, ''))
    .filter(l => l !== '')
    .join('\n')
}

// Manhattan distance between pairs of { x: Number, y: Number } objects
export function manhattan(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y)
}

export function translate(str, from, to) {
  const lookups = from.split('').reduce((acc, char, idx) => {
    acc[char] = to[idx]
    return acc
  }, {})

  let answer = []
  for (let i = 0; i < str.length; i++) {
    answer[i] = lookups[str[i]] || str[i]
  }
  return answer.join('')
}

// Cycle array. Usage:
// for (const elem of cycle(arr)) {
//   console.log(elem)
// }
export function* cycle(arr) {
  let idx = 0
  while (true) {
    yield arr[idx]
    idx = (idx + 1) % arr.length
  }
}

export function xor(a, b) {
  return a ? !b : !!b
}

export function Grid(sizeX, sizeY, fill, defaultOpts = {}) {
  const grid = Array(sizeX)
    .fill()
    .map(() => {
      const arr = Array(sizeY)
      if (typeof fill !== 'undefined') {
        arr.fill(fill)
      }
      return arr
    })

  grid.print = function print({
    padSize = defaultOpts.padSize || 0,
    minX = defaultOpts.minX || 0,
    minY = defaultOpts.minY || 0,
    maxX = defaultOpts.maxX || sizeX,
    maxY = defaultOpts.maxY || sizeY,
  } = {}) {
    let str = '\n'

    _.range(minY, maxY).forEach(y => {
      _.range(minX, maxX).forEach(x => {
        str += _.pad(grid[x][y], padSize)
      })
      str += '\n'
    })

    console.log(str)
  }

  grid.copy = function copy() {
    const copy = Grid(grid.length, grid[0].length, undefined, defaultOpts)
    for (let x = 0; x < grid.length; x++) {
      for (let y = 0; y < grid[0].length; y++) {
        copy[x][y] = grid[x][y]
      }
    }
    return copy
  }

  grid.equals = function equals(otherGrid) {
    if (!otherGrid) return false
    if (grid.length !== otherGrid.length) return false
    if (grid[0].length !== otherGrid[0].length) return false

    for (let x = 0; x < grid.length; x++) {
      for (let y = 0; y < grid[0].length; y++) {
        if (grid[x][y] !== otherGrid[x][y]) {
          return false
        }
      }
    }

    return true
  }

  grid.count = function count(val) {
    let res = 0

    for (let x = 0; x < grid.length; x++) {
      for (let y = 0; y < grid[0].length; y++) {
        if (grid[x][y] === val) {
          res++
        }
      }
    }

    return res
  }

  grid.neighbors4 = function neighbors8(x, y) {
    const res = []

    if (x - 1 >= 0) res.push({ x: x - 1, y })
    if (x + 1 < grid.length) res.push({ x: x + 1, y })
    if (y - 1 >= 0) res.push({ x, y: y - 1 })
    if (y + 1 < grid[0].length) res.push({ x, y: y + 1 })

    return res
  }

  grid.neighbors8 = function neighbors8(x, y) {
    const res = []

    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        if (dy === 0 && dx === 0) continue
        if (x + dx < 0 || x + dx >= grid.length) continue
        if (y + dy < 0 || y + dy >= grid[0].length) continue

        res.push({ x: x + dx, y: y + dy })
      }
    }

    return res
  }

  return grid
}

Grid.fromInput = function fromInput(input, defaultOpts) {
  const lines = input.split('\n')
  const grid = Grid(lines[0].length, lines.length, undefined, defaultOpts)

  lines.forEach((l, y) => {
    l.split('').forEach((c, x) => {
      grid[x][y] = c
    })
  })

  return grid
}
