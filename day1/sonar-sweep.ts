import { parseNumber, readFile, add, newLine } from '../utils'

const input = readFile('day1/input')

/* Part one: Count increases */

const countIncreases = (count: number, current: number, index: number, array: Array<number>) => count + (current > array[index - 1] ? 1 : 0)

const initalCount = 0

export const partOne = (input: string) => input
  .split(newLine)
  .map(parseNumber)
  .reduce(countIncreases, initalCount)

console.log('🎅 Day 1 (a): ', partOne(input))

/* Part two: Sliding window increases */

const nMeasurementSlidingWindow = (n: number) => (result: Array<number>, _: number, index: number, numbers: Array<number>) => {
  if (index + n > numbers.length) return result
  const sumNSlidingWindow = numbers.slice(index, index + n).reduce(add)
  return [...result, sumNSlidingWindow]
}

const threeMeasurementSlidingWindow = nMeasurementSlidingWindow(3)

export const partTwo = (input: string) => input
  .split(newLine)
  .map(parseNumber)
  .reduce(threeMeasurementSlidingWindow, [])
  .reduce(countIncreases, initalCount)

console.log('🎅 Day 1 (b): ', partTwo(input))


