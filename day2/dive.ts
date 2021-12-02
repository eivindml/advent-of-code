import { readFile, newLine, splitSpace, parseNumber, mult } from '../utils'

/** Part one */

const input = readFile('day2/input')

type Command = 'up' | 'down' | 'forward'

const parseLine = (line: Array<string>) => ({ command: line[0] as Command, value: parseNumber(line[1]) })

export const partOne = (input: string) => input
  .split(newLine)
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

export const partTwo = (input: string) => input
  .split(newLine)
  .map(splitSpace)
  .map(parseLine)
  .reduce(([horizontal, depth, aim], { command, value }) => {
    switch (command) {
      case 'up':
        return [horizontal, depth, aim - value]
      case 'down':
        return [horizontal, depth, aim + value]
      case 'forward':
        return [horizontal + value, depth + (aim * value), aim]
    }
  }, [0, 0, 0])
  .slice(0, -1)
  .reduce(mult)

console.log('🎅 Day 2 (b): ', partTwo(input))