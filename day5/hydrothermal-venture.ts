import { readFile, splitNewline, parseNumber, splitComma, splitArrow, transpose, mapPrint } from '../utils'
import { flow, pipe } from 'fp-ts/lib/function'
import { map, filter, reverse, reduce } from 'fp-ts/lib/Array'
import { or } from 'fp-ts/lib/Predicate'


/** Part one */

const parsed = pipe(
  readFile('day5/sample'),
  splitNewline,
  map(splitArrow),
  map(map(splitComma)),
  map(map(map(parseNumber))),
)

const isVertical = (input: number[][]) => input[0][0] === input[1][0]
const isHorizontal = (input: number[][]) => pipe(input, map(reverse), isVertical)
const isHorizontalOrVertical = isHorizontal //or(isHorizontal)(isVertical)

const maxY = pipe(
  parsed,
  map(([[, startY], [, endY]]) => Math.max(startY, endY)),
  reduce(-1, Math.max)
)

const combineLines = (input: ('.' | '1')[][]) => pipe(
  input,
  reduce([], (sum: string[], b) => {
    // Now sum is discarded when sum is longer than b
    if (b.length > sum.length) {

      return b.map((x, index) => {
        if (sum.length <= index) return x
        if (sum[index] === '.') return x
        if (x === '.') return sum[index]
        return `${parseNumber(x) + parseNumber(sum[index])}`
      })
    }
    return sum.map((x, index) => {
      if (sum.length <= index) return sum[index]
      if (sum[index] === '.') return sum[index]
      if (x === '.') return sum[index]
      return `${parseNumber(x) + parseNumber(sum[index])}`
    })
  }
  )
)

const filterHorizontalAndVertical = flow(
  filter(isHorizontalOrVertical),
  mapPrint,
  map(([[startX, startY], [endX, endY]]) => {
    const array = Array(Math.max(((startY + 1) * maxY) + startX, ((endY + 1) * maxY) + endX)).fill('.')
    return array.map((_, index) => {
      if (index >= (startY * maxY) + startX && index <= (endY * maxY) + endX) {
        return '1'
      } else if (index >= (endY * maxY) + endX && index <= (startY * maxY) + startX) {
        return '1'
      }
      else {
        return '.'
      }
    })
  }),
  mapPrint,
  combineLines,
  mapPrint,
  reduce('', (x, z) => x + z),
  console.log
)

const filtered = filterHorizontalAndVertical(parsed)


export const partOneSolution = filtered

console.log('🎅 Day 5 (a): ', partOneSolution)

