import { readFile, splitNewline, splitSpace, parseNumber, mult } from '../utils'
import { flow } from 'fp-ts/lib/function'
import { reduce } from 'fp-ts/lib/Array'

/** Part one */

const input = readFile('day2/sample')

type Command = 'up' | 'down' | 'forward'

const parseLine = (line: Array<string>) => ({ command: line[0] as Command, value: parseNumber(line[1]) })

export const partOne = (input: string) => splitNewline(input)
  .map(splitSpace)
  .map(parseLine)
  .reduce(([horizontal, depth], { command, value }) => {
    switch (command) {
      case 'up':
        return [horizontal, depth - value]
      case 'down':
        return [horizontal, depth + value]
      case 'forward':
        return [horizontal + value, depth]
    }
  }, [0, 0]).reduce(mult)

console.log('🎅 Day 2 (a): ', partOne(input))

/** Part two */
/** Trying out a functional approach using fp-ts */

const splitLinesWithSpace = (lines: Array<string>) => lines.map(splitSpace)
const parseLines = (lines: Array<Array<string>>) => lines.map(parseLine)
const calculateInstructions = (instructions: Array<{ command: Command, value: number }>) => instructions.reduce(([horizontal, depth, aim], { command, value }) => {
  switch (command) {
    case 'up':
      return [horizontal, depth, aim - value]
    case 'down':
      return [horizontal, depth, aim + value]
    case 'forward':
      return [horizontal + value, depth + (aim * value), aim]
  }
}, [0, 0, 0])
const dropLast: <T>(x: Array<T>) => Array<T> = (array) => array.slice(0, -1)
const product = reduce(1, mult)

export const partTwo = flow(
  splitNewline,
  splitLinesWithSpace,
  parseLines,
  calculateInstructions,
  dropLast,
  product
)



console.log('🎅 Day 2 (b): ', partTwo(input))