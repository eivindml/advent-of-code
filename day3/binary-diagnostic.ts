import { readFile, splitNewline, parseNumber, mult, splitChars, transpose } from '../utils'
import { flow, pipe } from 'fp-ts/lib/function'
import { map } from 'fp-ts/lib/Array'

// TODO: Clean up and reuse functions better

/** Part one */

const input = readFile('day3/input')

const mostCommonBit = (input: Array<number>) => Number(input.filter(Number).length >= input.length / 2)
const arrayToString = (input: Array<any>) => input.join('')
const binaryToDecimal = (input: string) => parseInt(input, 2)
const leastCommonBit = (input: Array<number>) => Number(input.filter(Number).length < input.length / 2)

const calculateCommonBit = (commonBit: (input: Array<number>) => number) => flow(
  splitNewline,
  map(splitChars),
  map(map(parseNumber)),
  transpose,
  map(commonBit),
  arrayToString,
  binaryToDecimal,
)

const gamma = calculateCommonBit(mostCommonBit)
const epsilon = calculateCommonBit(leastCommonBit)


const calculateCommonBit2 = (commonBit: (input: Array<number>) => number) => (input: number[][]) => pipe(
  input,
  transpose,
  map(commonBit),
)

export const partOne = (input: string) => mult(gamma(input), epsilon(input))

console.log('🎅 Day 2 (a): ', partOne(input))

/** Part two */

const parsedNumbers = pipe(
  input,
  splitNewline,
  map(splitChars),
  map(map(parseNumber)),
)

const mostCommonBits = pipe(
  parsedNumbers,
  transpose,
  map(mostCommonBit),
)

export const oxygenGeneratorRating = () => {
  return parsedNumbers.reduce((sum, current, index, full) => {
    if (sum.length === 1) {
      return sum
    }
    const commonBit = calculateCommonBit2(mostCommonBit)(sum)
    return sum.filter(a => a[index] === commonBit[index])
  }, parsedNumbers)
}

export const cO2ScrubberRating = () => {
  console.log('parsed numbers', parsedNumbers)
  //console.log('most common bit', mostCommonBits)
  return parsedNumbers.reduce((sum, current, index, full) => {
    if (sum.length === 1) {
      console.log('LENGT 1', sum)
      return sum
    }
    const commonBit = calculateCommonBit2(leastCommonBit)(sum)
    console.log('filtering', commonBit, 'index', index, 'after filter', sum.filter(a => a[index] === commonBit[index]))
    return sum.filter(a => a[index] === commonBit[index])
  }, parsedNumbers)
}

const partTwo = () => mult(pipe(oxygenGeneratorRating()[0], arrayToString,
  binaryToDecimal), (pipe(cO2ScrubberRating()[0], arrayToString, binaryToDecimal)))

console.log('🎅 Day 2 (b): ', partTwo())